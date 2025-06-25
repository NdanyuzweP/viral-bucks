import React, { useState } from 'react';
import { 
  Shield,
  Plus,
  X,
  User,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Users
} from 'lucide-react';

// Mock referral data
const mockReferrals = [
  {
    level: 1,
    email: 'john.doe@example.com',
    vipLevel: 1,
    userName: 'JohnDoe'
  },
  {
    level: 1,
    email: 'jane.smith@example.com',
    vipLevel: 2,
    userName: 'JaneSmith'
  },
  {
    level: 2,
    email: 'alice.jones@example.com',
    vipLevel: 0,
    userName: 'AliceJones'
  },
  {
    level: 2,
    email: 'bob.brown@example.com',
    vipLevel: 1,
    userName: 'BobBrown'
  },
  {
    level: 3,
    email: 'carol.white@example.com',
    vipLevel: 0,
    userName: 'CarolWhite'
  }
];

const Team: React.FC = () => {
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [applicationStep, setApplicationStep] = useState(1);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    tradingVolume: '',
    paymentMethods: [] as string[],
    idVerification: false,
    agreeTerms: false
  });

  const availablePaymentMethods = [
    'PayPal',
    'Bank Transfer',
    'Cash App',
    'Venmo',
    'Zelle',
    'Wire Transfer',
    'Apple Pay',
    'Google Pay'
  ];

  const handlePaymentMethodToggle = (method: string) => {
    setApplicationData(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }));
  };

  const handleSubmitApplication = () => {
    console.log('Application submitted:', applicationData);
    setApplicationStep(4);
    
    setTimeout(() => {
      setShowAgentModal(false);
      setApplicationStep(1);
      setApplicationData({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        tradingVolume: '',
        paymentMethods: [],
        idVerification: false,
        agreeTerms: false
      });
    }, 3000);
  };

  // const AgentApplicationModal = () => (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
  //     <div className="bg-white rounded-2xl w-full max-w-[343px] max-h-[80vh] overflow-y-auto">
  //       <div className="flex items-center justify-between p-4 border-b border-gray-100">
  //         <h2 className="text-lg font-bold text-gray-900">Become a Team Agent</h2>
  //         <button
  //           onClick={() => setShowAgentModal(false)}
  //           className="p-2 hover:bg-gray-100 rounded-full"
  //         >
  //           <X size={16} className="text-gray-600" />
  //         </button>
  //       </div>

  //       <div className="px-4 py-3">
  //         <div className="flex items-center space-x-2">
  //           {[1, 2, 3].map((step) => (
  //             <div key={step} className="flex items-center">
  //               <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
  //                 applicationStep >= step
  //                   ? 'bg-blue-500 text-white'
  //                   : 'bg-gray-200 text-gray-600'
  //               }`}>
  //                 {step}
  //               </div>
  //               {step < 3 && (
  //                 <div className={`w-6 h-1 mx-1 ${
  //                   applicationStep > step ? 'bg-blue-500' : 'bg-gray-200'
  //                 }`} />
  //               )}
  //             </div>
  //           ))}
  //         </div>
  //       </div>

  //       <div className="p-4">
  //         {applicationStep === 1 && (
  //           <div>
  //             <div className="mb-4">
  //               <div className="flex items-center space-x-2 mb-2">
  //                 <User className="h-4 w-4 text-blue-500" />
  //                 <h3 className="font-semibold text-gray-900 text-sm">Personal Information</h3>
  //               </div>
  //               <p className="text-xs text-gray-600">Tell us about yourself</p>
  //             </div>

  //             <div className="space-y-3">
  //               <div>
  //                 <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
  //                 <input
  //                   type="text"
  //                   value={applicationData.fullName}
  //                   onChange={(e) => setApplicationData(prev => ({ ...prev, fullName: e.target.value }))}
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
  //                   placeholder="Enter your full name"
  //                 />
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
  //                 <input
  //                   type="email"
  //                   value={applicationData.email}
  //                   onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
  //                   placeholder="Enter your email"
  //                 />
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
  //                 <input
  //                   type="tel"
  //                   value={applicationData.phone}
  //                   onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
  //                   placeholder="Enter your phone number"
  //                 />
  //               </div>
  //             </div>

  //             <button
  //               onClick={() => setApplicationStep(2)}
  //               disabled={!applicationData.fullName || !applicationData.email || !applicationData.phone}
  //               className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
  //             >
  //               Continue
  //             </button>
  //           </div>
  //         )}

  //         {applicationStep === 2 && (
  //           <div>
  //             <div className="mb-4">
  //               <div className="flex items-center space-x-2 mb-2">
  //                 <CreditCard className="h-4 w-4 text-blue-500" />
  //                 <h3 className="font-semibold text-gray-900 text-sm">Experience</h3>
  //               </div>
  //               <p className="text-xs text-gray-600">Help us understand your background</p>
  //             </div>

  //             <div className="space-y-3">
  //               <div>
  //                 <label className="block text-xs font-medium text-gray-700 mb-1">Team Leadership Experience</label>
  //                 <select
  //                   value={applicationData.experience}
  //                   onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
  //                 >
  //                   <option value="">Select experience level</option>
  //                   <option value="beginner">Beginner (less than 6 months)</option>
  //                   <option value="intermediate">Intermediate (6 months to 2 years)</option>
  //                   <option value="advanced">Advanced (2+ years)</option>
  //                   <option value="expert">Expert (5+ years)</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-medium text-gray-700 mb-1">Monthly Referral Volume</label>
  //                 <select
  //                   value={applicationData.tradingVolume}
  //                   onChange={(e) => setApplicationData(prev => ({ ...prev, tradingVolume: e.target.value }))}
  //                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
  //                 >
  //                   <option value="">Select referral volume</option>
  //                   <option value="1-5">1-5 referrals</option>
  //                   <option value="6-10">6-10 referrals</option>
  //                   <option value="11-20">11-20 referrals</option>
  //                   <option value="20+">20+ referrals</option>
  //                 </select>
  //               </div>

  //               <div>
  //                 <label className="block text-xs font-medium text-gray-700 mb-2">Preferred Payment Methods</label>
  //                 <div className="grid grid-cols-2 gap-2">
  //                   {availablePaymentMethods.map((method) => (
  //                     <label key={method} className="flex items-center space-x-2 cursor-pointer">
  //                       <input
  //                         type="checkbox"
  //                         checked={applicationData.paymentMethods.includes(method)}
  //                         onChange={() => handlePaymentMethodToggle(method)}
  //                         className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
  //                       />
  //                       <span className="text-xs text-gray-700">{method}</span>
  //                     </label>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>

  //             <div className="flex space-x-2 mt-4">
  //               <button
  //                 onClick={() => setApplicationStep(1)}
  //                 className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm"
  //               >
  //                 Back
  //               </button>
  //               <button
  //                 onClick={() => setApplicationStep(3)}
  //                 disabled={!applicationData.experience || !applicationData.tradingVolume || applicationData.paymentMethods.length === 0}
  //                 className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
  //               >
  //                 Continue
  //               </button>
  //             </div>
  //           </div>
  //         )}

  //         {applicationStep === 3 && (
  //           <div>
  //             <div className="mb-4">
  //               <div className="flex items-center space-x-2 mb-2">
  //                 <Shield className="h-4 w-4 text-blue-500" />
  //                 <h3 className="font-semibold text-gray-900 text-sm">Verification & Terms</h3>
  //               </div>
  //               <p className="text-xs text-gray-600">Final steps to complete your application</p>
  //             </div>

  //             <div className="space-y-3">
  //               <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
  //                 <div className="flex items-start space-x-2">
  //                   <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
  //                   <div>
  //                     <p className="text-xs font-medium text-yellow-800">ID Verification Required</p>
  //                     <p className="text-xs text-yellow-700">You'll need to complete identity verification before becoming an active agent.</p>
  //                   </div>
  //                 </div>
  //               </div>

  //               <label className="flex items-start space-x-2 cursor-pointer">
  //                 <input
  //                   type="checkbox"
  //                   checked={applicationData.idVerification}
  //                   onChange={(e) => setApplicationData(prev => ({ ...prev, idVerification: e.target.checked }))}
  //                   className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
  //                 />
  //                 <span className="text-xs text-gray-700">
  //                   I understand that ID verification is required and I'm ready to provide necessary documents.
  //                 </span>
  //               </label>

  //               <label className="flex items-start space-x-2 cursor-pointer">
  //                 <input
  //                   type="checkbox"
  //                   checked={applicationData.agreeTerms}
  //                   onChange={(e) => setApplicationData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
  //                   className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
  //                 />
  //                 <span className="text-xs text-gray-700">
  //                   I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Team Agent Agreement</span>.
  //                 </span>
  //               </label>
  //             </div>

  //             <div className="flex space-x-2 mt-4">
  //               <button
  //                 onClick={() => setApplicationStep(2)}
  //                 className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm"
  //               >
  //                 Back
  //               </button>
  //               <button
  //                 onClick={handleSubmitApplication}
  //                 disabled={!applicationData.idVerification || !applicationData.agreeTerms}
  //                 className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
  //               >
  //                 Submit Application
  //               </button>
  //             </div>
  //           </div>
  //         )}

  //         {applicationStep === 4 && (
  //           <div className="text-center py-6">
  //             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
  //               <CheckCircle className="h-6 w-6 text-green-600" />
  //             </div>
  //             <h3 className="text-base font-semibold text-gray-900 mb-2">Application Submitted!</h3>
  //             <p className="text-xs text-gray-600 mb-3">
  //               Thank you for applying to become a Team agent. We'll review your application and get back to you within 1-2 business days.
  //             </p>
  //             <p className="text-xs text-gray-500">
  //               You'll receive an email confirmation shortly.
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );

  const ReferralTable = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-base font-bold text-gray-900 mb-4">Your Referral Team</h3>
      <div className="space-y-5">
        {[1, 2, 3].map((level) => (
          <div key={level}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-800">Level {level}</h4>
              <span className="text-xs text-gray-600">
                {mockReferrals.filter(ref => ref.level === level).length} Members
              </span>
            </div>
            {mockReferrals.filter(ref => ref.level === level).length > 0 ? (
              <div className="space-y-3">
                {mockReferrals
                  .filter(ref => ref.level === level)
                  .map((referral) => (
                    <div key={referral.email} className="border border-gray-100 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-medium">
                              {referral.userName.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{referral.userName}</p>
                            <p className="text-xs text-gray-600">{referral.email}</p>
                          </div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Level {referral.vipLevel}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Users className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-600">No referrals at this level</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 max-w-[375px] mx-auto">
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Your Team</h1>
            <p className="text-xs text-gray-600">Manage your referral network</p>
          </div>
          {/* <button 
            onClick={() => setShowAgentModal(true)}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
            title="Apply to become a Team Agent"
          >
            <Plus size={16} />
          </button> */}
        </div>
      </div>

      <div className="px-4 py-4 pb-20">
        <ReferralTable />
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-100 px-4 py-3 max-w-[375px] mx-auto">
        <div className="flex items-start space-x-2">
          <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-blue-900">Team Benefits</p>
            <p className="text-xs text-blue-800">Earn rewards by building your referral network</p>
          </div>
        </div>
      </div>

      {showAgentModal && <AgentApplicationModal />}
    </div>
  );
};

export default Team;