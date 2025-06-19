import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Calendar, 
  Award, 
  TrendingUp,
  Share2,
  Shield,
  Eye,
  EyeOff,
  Edit3,
  Save,
  X,
  Copy
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [copied, setCopied] = useState(false);

  // Generate a referral link (you might want to get this from your backend)
  const referralCode = user?.referralCode || 'VLAR' + Math.random().toString(36).substr(2, 8).toUpperCase();
  const referralLink = `https://vilarbucks.com/signup?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-600 mt-1">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">
                  {user?.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <div className="flex items-center justify-center space-x-1 mt-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">Verified Account</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Member since</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Tasks completed</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{user?.tasksCompleted}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Total earned</span>
                </div>
                <span className="text-sm font-medium text-gray-900">${user?.totalEarned.toFixed(2)}</span>
              </div>

              

            <button
              onClick={() => setIsEditing(true)}
              className="w-full mt-6 flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium"
            >
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
        {/* Referral Section */}
              <div className="p-3 bg-gradient-to-r from-primary-50  to-secondary-50 rounded-lg border border-primary-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Share2 className="h-4 w-4 text-primary-600" />
                  <span className="text-sm font-medium text-primary-700">Your Referral Code</span>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 bg-white rounded-l-lg p-2 border border-r-0 border-gray-300">
                    <span className="font-mono text-sm">{referralCode}</span>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-r-lg border border-primary-500 transition-colors text-sm flex items-center"
                  >
                    <Copy size={16} className="mr-1" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                {/* <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-1">Share your referral link:</p>
                  <div className="flex">
                    <input
                      type="text"
                      readOnly
                      value={referralLink}
                      className="flex-1 text-xs p-2 border border-gray-300 rounded-l-lg focus:outline-none"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-secondary-500 hover:bg-secondary-600 text-white px-3 py-2 rounded-r-lg border border-secondary-500 transition-colors text-xs"
                    >
                      Copy Link
                    </button>
                  </div>
                </div> */}
                {user?.referralCount > 0 && (
                  <div className="mt-2 text-center text-xs text-green-600">
                    You've referred {user.referralCount} friends! Earned ${(user.referralCount * 5).toFixed(2)}
                  </div>
                )}
              </div>
            </div>

        {/* Rest of your existing code remains the same */}
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* Danger Zone */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-red-200">
            <div className="space-y-4">
              <button
                onClick={logout}
                className="w-full sm:w-auto ml-0 sm:ml-3 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal Overlay */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={handleCancel}></div>
      )}
    </div>
  );
};

export default Profile;