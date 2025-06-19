import React, { useState } from 'react';
import { 
  Crown, 
  DollarSign, 
  Lock,
  Star,
  CheckCircle,
  Calendar,
  TrendingUp,
  Gift,
  Users,
  Shield
} from 'lucide-react';

const VIPSystem: React.FC = () => {
  const [selectedVIP, setSelectedVIP] = useState<string | null>(null);
  const [userVIP, setUserVIP] = useState<number>(0); // Current user VIP level

  const vipLevels = [
    {
      id: 'vip0',
      level: 0,
      name: 'VIP 0',
      cost: 0,
      dailyEarning: 0.5,
      status: 'active',
      color: 'from-gray-400 to-gray-600',
      bgColor: 'from-gray-50 to-gray-100',
      icon: Users,
      features: ['Basic earning', 'Community access', 'Daily check-in bonus']
    },
    {
      id: 'vip1',
      level: 1,
      name: 'VIP 1',
      cost: 35,
      dailyEarning: 1,
      status: 'active',
      color: 'from-blue-400 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100',
      icon: Star,
      features: ['2x earning rate', 'Priority support', 'Exclusive tasks', 'Weekly bonus']
    },
    {
      id: 'vip2',
      level: 2,
      name: 'VIP 2',
      cost: 70,
      dailyEarning: 2.5,
      status: 'active',
      color: 'from-purple-400 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100',
      icon: Crown,
      features: ['5x earning rate', 'VIP chat room', 'Monthly rewards', 'Early task access']
    },
    {
      id: 'vip3',
      level: 3,
      name: 'VIP 3',
      cost: 120,
      dailyEarning: 5,
      status: 'active',
      color: 'from-green-400 to-green-600',
      bgColor: 'from-green-50 to-green-100',
      icon: TrendingUp,
      features: ['10x earning rate', 'Personal manager', 'Premium bonuses', 'Referral rewards']
    },
    {
      id: 'vip4',
      level: 4,
      name: 'VIP 4',
      cost: 250,
      dailyEarning: 10,
      status: 'active',
      color: 'from-orange-400 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100',
      icon: Gift,
      features: ['20x earning rate', 'VIP events', 'Custom rewards', 'Advanced analytics']
    },
    {
      id: 'vip5',
      level: 5,
      name: 'VIP 5',
      cost: 500,
      dailyEarning: 22,
      status: 'closed',
      color: 'from-red-400 to-red-600',
      bgColor: 'from-red-50 to-red-100',
      icon: Shield,
      features: ['44x earning rate', 'Elite access', 'Exclusive rewards', 'VIP concierge']
    },
    {
      id: 'vip6',
      level: 6,
      name: 'VIP 6',
      cost: 800,
      dailyEarning: 38,
      status: 'closed',
      color: 'from-pink-400 to-pink-600',
      bgColor: 'from-pink-50 to-pink-100',
      icon: Crown,
      features: ['76x earning rate', 'Diamond benefits', 'Luxury rewards', 'Private advisor']
    },
    {
      id: 'vip7',
      level: 7,
      name: 'VIP 7',
      cost: 1200,
      dailyEarning: 70,
      status: 'closed',
      color: 'from-indigo-400 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100',
      icon: Crown,
      features: ['140x earning rate', 'Platinum access', 'Ultimate rewards', 'Dedicated team']
    }
  ];

  const handleUpgrade = (vipLevel: number, cost: number) => {
    // Simulate upgrade logic
    setUserVIP(vipLevel);
    setSelectedVIP(null);
    // In real app, handle payment and upgrade logic here
  };

  const VIPModal = ({ vip }: { vip: any }) => {
    const IconComponent = vip.icon;
    const monthlyEarning = vip.dailyEarning * 30;
    const roiDays = vip.cost > 0 ? Math.ceil(vip.cost / vip.dailyEarning) : 0;

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-sm max-h-[70vh] overflow-y-auto">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-gradient-to-r ${vip.bgColor}`}>
                <IconComponent className={`h-6 w-6 bg-gradient-to-r ${vip.color} bg-clip-text text-transparent`} />
              </div>
              <button
                onClick={() => setSelectedVIP(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
              >
                ✕
              </button>
            </div>

            {/* VIP Info */}
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{vip.name}</h3>
              {vip.status === 'closed' && (
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                  <Lock className="h-3 w-3 mr-1" />
                  Closed
                </div>
              )}
            </div>

            {/* Earnings Info */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${vip.bgColor}`}>
                <div className="flex items-center space-x-1 mb-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-bold text-gray-900 text-sm">${vip.dailyEarning.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-600">Daily</p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-r ${vip.bgColor}`}>
                <div className="flex items-center space-x-1 mb-1">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="font-bold text-gray-900 text-sm">${monthlyEarning.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-600">Monthly</p>
              </div>
            </div>

            {/* Investment Info */}
            {vip.cost > 0 && (
              <div className="bg-gray-50 rounded-xl p-3 mb-4">
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Investment</p>
                    <p className="font-bold text-gray-900 text-sm">${vip.cost}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">ROI Time</p>
                    <p className="font-bold text-gray-900 text-sm">{roiDays} days</p>
                  </div>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="mb-4">
              <h4 className="font-bold text-gray-900 mb-2 text-sm">Benefits:</h4>
              <div className="space-y-1">
                {vip.features.slice(0, 3).map((feature: string, index: number) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 bg-gradient-to-r ${vip.color}`}>
                      <CheckCircle className="h-2.5 w-2.5 text-white" />
                    </div>
                    <p className="text-gray-700 text-xs">{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              {vip.status === 'closed' ? (
                <div className="w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-xl text-center font-medium text-sm">
                  <Lock className="h-4 w-4 inline mr-2" />
                  Not Available
                </div>
              ) : vip.level === 0 && userVIP === 0 ? (
                <div className="w-full py-3 px-4 bg-green-100 text-green-700 rounded-xl text-center font-medium text-sm">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  Receive Tasks
                </div>
              ) : vip.level <= userVIP ? (
                <div className="w-full py-3 px-4 bg-green-100 text-green-700 rounded-xl text-center font-medium text-sm">
                  <CheckCircle className="h-4 w-4 inline mr-2" />
                  Current Level
                </div>
              ) : (
                <button
                  onClick={() => handleUpgrade(vip.level, vip.cost)}
                  className={`w-full py-3 px-4 bg-gradient-to-r ${vip.color} text-white rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg text-sm`}
                >
                  Upgrade for ${vip.cost}
                </button>
              )}
              <button
                onClick={() => setSelectedVIP(null)}
                className="w-full py-2 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VIP Membership</h1>
        <p className="text-gray-600">Choose your earning level and start making money daily</p>
        <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full">
          <Crown className="h-5 w-5 text-primary-600 mr-2" />
          <span className="text-sm font-medium text-primary-700">
            Current: VIP {userVIP}
          </span>
        </div>
      </div>

      {/* VIP Cards */}
      <div className="space-y-4 max-w-md mx-auto">
        {vipLevels.map((vip) => {
          const IconComponent = vip.icon;
          const isCurrentLevel = vip.level === userVIP;
          const monthlyEarning = vip.dailyEarning * 30;

          return (
            <div
              key={vip.id}
              className={`bg-white rounded-3xl p-6 shadow-sm border transition-all duration-200 ${
                isCurrentLevel 
                  ? 'border-primary-200 shadow-md ring-2 ring-primary-100' 
                  : vip.status === 'closed'
                  ? 'border-gray-200 opacity-60'
                  : 'border-gray-100 hover:shadow-md hover:scale-[1.02]'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${vip.bgColor}`}>
                    <IconComponent className={`h-6 w-6 bg-gradient-to-r ${vip.color} bg-clip-text text-transparent`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{vip.name}</h3>
                    {vip.cost > 0 && (
                      <p className="text-sm text-gray-600">${vip.cost} investment</p>
                    )}
                  </div>
                </div>
                
                {vip.status === 'closed' && (
                  <div className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs font-medium">
                    <Lock className="h-3 w-3 inline mr-1" />
                    Closed
                  </div>
                )}
                
                {isCurrentLevel && (
                  <div className="px-2 py-1 bg-green-100 text-green-600 rounded-lg text-xs font-medium">
                    <CheckCircle className="h-3 w-3 inline mr-1" />
                    Active
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${vip.bgColor}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-gray-900">${vip.dailyEarning.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-600">Daily</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${vip.bgColor}`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <span className="font-bold text-gray-900">${monthlyEarning.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-600">Monthly</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVIP(vip.id)}
                className={`w-full py-3 px-4 rounded-2xl font-medium transition-all duration-200 ${
                  isCurrentLevel && vip.level === 0
                    ? 'bg-green-100 text-green-700'
                    : isCurrentLevel
                    ? 'bg-green-100 text-green-700'
                    : vip.status === 'closed'
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : `bg-gradient-to-r ${vip.color} text-white hover:shadow-lg transform hover:scale-105`
                }`}
                disabled={vip.status === 'closed'}
              >
                {isCurrentLevel && vip.level === 0 ? 'Receive Tasks' : isCurrentLevel ? 'Current Level' : vip.status === 'closed' ? 'Not Available' : 'View Details'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom Info */}
      <div className="mt-8 max-w-md mx-auto">
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-6">
          <div className="text-center">
            <Star className="h-8 w-8 text-primary-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-2">Start Earning Today</h3>
            <p className="text-sm text-gray-600 mb-4">
              All VIP levels earn money automatically every day. Higher levels = higher daily earnings!
            </p>
            <div className="text-xs text-gray-500">
              * Earnings are credited automatically to your account daily
            </div>
          </div>
        </div>
      </div>

      {/* VIP Modal */}
      {selectedVIP && (
        <VIPModal vip={vipLevels.find(v => v.id === selectedVIP)} />
      )}
    </div>
  );
};

export default VIPSystem;