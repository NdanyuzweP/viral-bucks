import React, { useState } from 'react';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  CreditCard,
  Smartphone,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  ArrowLeftRight,
  User,
  Star,
  Search,
  ShoppingCart,
  Eye,
  MessageCircle,
  ArrowLeft,
  Shield,
  X
} from 'lucide-react';

// Mock user data - replace with actual auth context
const mockUser = {
  balance: 1250.75,
  totalEarned: 2840.50,
  tasksCompleted: 142
};

const EnhancedWallet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'deposit' | 'withdraw' | 'p2p'>('overview');
  const [p2pMode, setP2pMode] = useState<'buy' | 'sell' | 'orders'>('buy');
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [showP2pDashboard, setShowP2pDashboard] = useState(false);
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

  const recentTransactions = [
    {
      id: '1',
      type: 'earning',
      title: 'Task Completion - Instagram Follow',
      amount: '+$2.50',
      date: '2024-01-20T14:30:00',
      status: 'completed',
    },
    {
      id: '2',
      type: 'p2p_sell',
      title: 'P2P Trade - USDT Sale',
      amount: '+$50.00',
      date: '2024-01-20T10:15:00',
      status: 'completed',
    },
    {
      id: '3',
      type: 'withdrawal',
      title: 'PayPal Withdrawal',
      amount: '-$25.00',
      date: '2024-01-19T16:45:00',
      status: 'pending',
    },
    {
      id: '4',
      type: 'earning',
      title: 'Survey Completion',
      amount: '+$5.00',
      date: '2024-01-19T12:20:00',
      status: 'completed',
    },
    {
      id: '5',
      type: 'referral',
      title: 'Referral Bonus',
      amount: '+$15.00',
      date: '2024-01-18T09:30:00',
      status: 'completed',
    },
  ];

  const p2pOffers = [
    {
      id: '1',
      trader: 'kellybobo',
      trades: 627,
      completion: 97.10,
      rating: 99.38,
      price: 1469,
      currency: 'RWF',
      cryptoAmount: 140.4,
      limit: '5,000 - 206,261 RWF',
      paymentMethods: ['MTN Mobile Money', 'Bank Transfer'],
      responseTime: '15 min'
    },
    {
      id: '2',
      trader: 'Emmy_Traderpro',
      trades: 3091,
      completion: 100.0,
      rating: 99.76,
      price: 1469,
      currency: 'RWF',
      cryptoAmount: 176.09,
      limit: '10,000 - 258,688 RWF',
      paymentMethods: ['MTN Mobile Money', 'MoMo', 'Equity Bank'],
      responseTime: '15 min'
    },
    {
      id: '3',
      trader: 'ERIC_NICE_Ltd',
      trades: 2370,
      completion: 99.50,
      rating: 98.93,
      price: 1469.38,
      currency: 'RWF',
      cryptoAmount: 673.99,
      limit: '20,000 - 990,349 RWF',
      paymentMethods: ['MTN Mobile Money', 'Equity Bank', 'Bank Transfer'],
      responseTime: '15 min'
    }
  ];

  const myOrders = [
    {
      id: 'ORD001',
      type: 'buy',
      amount: '50 USDT',
      price: '1,469 RWF',
      total: '73,450 RWF',
      status: 'completed',
      trader: 'kellybobo',
      date: '2024-01-20T14:30:00'
    },
    {
      id: 'ORD002',
      type: 'sell',
      amount: '25 USDT',
      price: '1,470 RWF',
      total: '36,750 RWF',
      status: 'pending',
      trader: 'Emmy_Traderpro',
      date: '2024-01-20T16:15:00'
    }
  ];

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earning':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'p2p_sell':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'withdrawal':
        return <ArrowUpRight className="h-5 w-5 text-red-500" />;
      case 'referral':
        return <DollarSign className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

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

  const AgentApplicationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-[343px] max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Become a Team Agent</h2>
          <button
            onClick={() => setShowAgentModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={16} className="text-gray-600" />
          </button>
        </div>

        <div className="px-4 py-3">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  applicationStep >= step
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-6 h-1 mx-1 ${
                    applicationStep > step ? 'bg-blue-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4">
          {applicationStep === 1 && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <User className="h-4 w-4 text-blue-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">Personal Information</h3>
                </div>
                <p className="text-xs text-gray-600">Tell us about yourself</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={applicationData.fullName}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={applicationData.email}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={applicationData.phone}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <button
                onClick={() => setApplicationStep(2)}
                disabled={!applicationData.fullName || !applicationData.email || !applicationData.phone}
                className="w-full mt-4 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          )}

          {applicationStep === 2 && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CreditCard className="h-4 w-4 text-blue-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">Experience</h3>
                </div>
                <p className="text-xs text-gray-600">Help us understand your background</p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Team Leadership Experience</label>
                  <select
                    value={applicationData.experience}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, experience: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Beginner (less than 6 months)</option>
                    <option value="intermediate">Intermediate (6 months to 2 years)</option>
                    <option value="advanced">Advanced (2+ years)</option>
                    <option value="expert">Expert (5+ years)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Monthly Referral Volume</label>
                  <select
                    value={applicationData.tradingVolume}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, tradingVolume: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select referral volume</option>
                    <option value="1-5">1-5 referrals</option>
                    <option value="6-10">6-10 referrals</option>
                    <option value="11-20">11-20 referrals</option>
                    <option value="20+">20+ referrals</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-2">Preferred Payment Methods</label>
                  <div className="grid grid-cols-2 gap-2">
                    {availablePaymentMethods.map((method) => (
                      <label key={method} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={applicationData.paymentMethods.includes(method)}
                          onChange={() => handlePaymentMethodToggle(method)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-xs text-gray-700">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setApplicationStep(1)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm"
                >
                  Back
                </button>
                <button
                  onClick={() => setApplicationStep(3)}
                  disabled={!applicationData.experience || !applicationData.tradingVolume || applicationData.paymentMethods.length === 0}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {applicationStep === 3 && (
            <div>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <h3 className="font-semibold text-gray-900 text-sm">Verification & Terms</h3>
                </div>
                <p className="text-xs text-gray-600">Final steps to complete your application</p>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-yellow-800">ID Verification Required</p>
                      <p className="text-xs text-yellow-700">You'll need to complete identity verification before becoming an active agent.</p>
                    </div>
                  </div>
                </div>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applicationData.idVerification}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, idVerification: e.target.checked }))}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">
                    I understand that ID verification is required and I'm ready to provide necessary documents.
                  </span>
                </label>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applicationData.agreeTerms}
                    onChange={(e) => setApplicationData(prev => ({ ...prev, agreeTerms: e.target.checked }))}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">
                    I agree to the <span className="text-blue-600 underline">Terms of Service</span> and <span className="text-blue-600 underline">Team Agent Agreement</span>.
                  </span>
                </label>
              </div>

              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setApplicationStep(2)}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium text-sm"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitApplication}
                  disabled={!applicationData.idVerification || !applicationData.agreeTerms}
                  className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Application
                </button>
              </div>
            </div>
          )}

          {applicationStep === 4 && (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-xs text-gray-600 mb-3">
                Thank you for applying to become a Team agent. We'll review your application and get back to you within 1-2 business days.
              </p>
              <p className="text-xs text-gray-500">
                You'll receive an email confirmation shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: WalletIcon },
    { id: 'transactions', label: 'Transactions', icon: Clock },
    { id: 'deposit', label: 'Deposit', icon: Plus },
    { id: 'withdraw', label: 'Withdraw', icon: Minus },
  ];

  if (showP2pDashboard) {
    return (
      <div className="space-y-4 p-4">
        {/* P2P Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowP2pDashboard(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">P2P Trading</h1>
              <p className="text-sm text-gray-600">Buy and sell crypto with other users</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAgentModal(true)}
            className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
            title="Apply to become a P2P Agent"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* P2P Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setP2pMode('buy')}
              className={`flex-1 py-3 px-4 font-medium text-sm transition-all duration-200 ${
                p2pMode === 'buy'
                  ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setP2pMode('sell')}
              className={`flex-1 py-3 px-4 font-medium text-sm transition-all duration-200 ${
                p2pMode === 'sell'
                  ? 'text-red-600 border-b-2 border-red-600 bg-red-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Sell
            </button>
            <button
              onClick={() => setP2pMode('orders')}
              className={`flex-1 py-3 px-4 font-medium text-sm transition-all duration-200 ${
                p2pMode === 'orders'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              My Orders
            </button>
          </div>
        </div>

        {/* Filters (shown only for Buy/Sell) */}
        {p2pMode !== 'orders' && (
          <div className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="space-y-3">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="USDT">USDT</option>
                <option value="BTC">RWF</option>
                <option value="ETH">ETH</option>
                <option value="ETH">UGX</option>
              </select>
            </div>
          </div>
        )}

        {/* Content */}
        {p2pMode !== 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">
                {p2pMode === 'buy' ? 'Buy' : 'Sell'} {selectedCurrency}
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {p2pOffers.map((offer) => (
                <div key={offer.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{offer.trader}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <span>{offer.trades} trades</span>
                          <span>({offer.completion}%)</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span>{offer.rating}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-base font-bold text-gray-900">
                          {offer.price.toLocaleString()} {offer.currency}
                        </p>
                        <p className="text-xs text-gray-600">
                          Available: {offer.cryptoAmount} {selectedCurrency}
                        </p>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium text-sm">
                        {p2pMode === 'buy' ? 'Buy' : 'Sell'}
                      </button>
                    </div>
                    <div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {offer.paymentMethods.map((method, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                          >
                            {method}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                        <Clock className="h-3 w-3" />
                        <span>{offer.responseTime}</span>
                      </div>
                      <p className="text-xs text-gray-500">{offer.limit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {p2pMode === 'orders' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">My Orders</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {myOrders.map((order) => (
                <div key={order.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.type === 'buy' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.type.toUpperCase()}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(order.status)}
                        <span className={`text-xs font-medium capitalize ${
                          order.status === 'completed' ? 'text-green-600' : 
                          order.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{order.amount}</p>
                        <p className="text-xs text-gray-600">@ {order.price}</p>
                      </div>
                      <p className="font-medium text-gray-900 text-sm">{order.total}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-600">with {order.trader}</p>
                      <div className="flex space-x-2">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageCircle className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-sm text-gray-600 mt-1">Manage your earnings and transactions</p>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl p-6 text-white">
        <div className="space-y-4">
          <div>
            <p className="text-white/80 text-base mb-2">Total Balance</p>
            <p className="text-3xl font-bold mb-4">${mockUser?.balance.toFixed(2)}</p>
            <div className="flex flex-col space-y-2 text-white/90">
              <div>
                <p className="text-xs">Total Earned</p>
                <p className="font-bold">${mockUser?.totalEarned.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs">Tasks Completed</p>
                <p className="font-bold">{mockUser?.tasksCompleted}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4">
              <WalletIcon className="h-10 w-10 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1 px-4 py-3 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent size={18} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('deposit')}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">Deposit</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
              
              <button
                onClick={() => setActiveTab('withdraw')}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500 rounded-lg">
                    <Minus className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">Withdraw</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
              
              <button 
                onClick={() => setShowP2pDashboard(true)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <ArrowLeftRight className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900 text-sm">P2P Trading</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-gray-900">Recent Activity</h3>
              <button
                onClick={() => setActiveTab('transactions')}
                className="text-primary-600 hover:text-primary-700 font-medium text-sm"
              >
                View All
              </button>
            </div>
            <div className="space-y-3">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gray-100">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{transaction.title}</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${
                      transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-4">Transaction History</h3>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-gray-100">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{transaction.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(transaction.type)}
                    <p className="text-xs text-gray-500 capitalize">{transaction.status}</p>
                    <span className="text-gray-300">•</span>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-bold ${
                    transaction.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'deposit' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-4">Add Funds</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Credit/Debit Card</p>
                    <p className="text-xs text-gray-600">Instant deposit with 2.9% fee</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Smartphone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Mobile Payment</p>
                    <p className="text-xs text-gray-600">PayPal, Apple Pay, Google Pay</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 text-sm mb-4">Deposit Amount</h4>
              <div className="space-y-3">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="grid grid-cols-2 gap-2">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      className="py-2 px-3 text-xs border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium text-sm">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'withdraw' && (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-base font-bold text-gray-900 mb-4">Withdraw Funds</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Smartphone className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">PayPal</p>
                    <p className="text-xs text-gray-600">1-2 business days • No fee</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Bank Transfer</p>
                    <p className="text-xs text-gray-600">3-5 business days • $2 fee</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 text-sm mb-4">Withdrawal Details</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Available Balance</p>
                  <p className="text-base font-bold text-gray-900">${mockUser?.balance.toFixed(2)}</p>
                </div>
                <input
                  type="number"
                  placeholder="Enter amount to withdraw"
                  max={mockUser?.balance}
                  className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">Minimum withdrawal: $10.00</p>
                <button className="w-full py-2 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium text-sm">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAgentModal && <AgentApplicationModal />}
    </div>
  );
};

export default EnhancedWallet;