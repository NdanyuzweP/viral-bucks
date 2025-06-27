import apiClient from './api';

export interface KYCSubmission {
  documentType: 'passport' | 'id_card' | 'driving_license';
  documentNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface KYCStatus {
  status: 'not_submitted' | 'pending' | 'approved' | 'rejected';
  level: number;
  rejectionReason?: string;
  verifiedAt?: string;
  expiresAt?: string;
}

export interface KYCRecord {
  id: number;
  status: string;
  level: number;
  createdAt: string;
}

class KYCService {
  async submitKYC(kycData: KYCSubmission, files: {
    documentFront: File;
    documentBack?: File;
    selfie: File;
  }): Promise<{ message: string; kyc: KYCRecord }> {
    const formData = new FormData();
    
    // Add text fields
    Object.entries(kycData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    
    // Add files
    formData.append('documentFront', files.documentFront);
    if (files.documentBack) {
      formData.append('documentBack', files.documentBack);
    }
    formData.append('selfie', files.selfie);

    const response = await apiClient.post('/kyc/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  async getKYCStatus(): Promise<KYCStatus> {
    const response = await apiClient.get('/kyc/status');
    return response.data;
  }

  async getPendingKYCs(): Promise<{ kycs: any[] }> {
    const response = await apiClient.get('/kyc/pending');
    return response.data;
  }

  async reviewKYC(id: number, reviewData: {
    status: 'approved' | 'rejected';
    rejectionReason?: string;
    level?: number;
  }): Promise<{ message: string; kyc: any }> {
    const response = await apiClient.patch(`/kyc/${id}/review`, reviewData);
    return response.data;
  }
}

export const kycService = new KYCService();