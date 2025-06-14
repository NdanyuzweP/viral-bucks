import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft,
  CreditCard,
  Smartphone,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus
} from 'lucide-react';

const Wallet: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'deposit' | 'withdraw'>('overview');

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: WalletIcon },
    { id: 'transactions', label: 'Transactions', icon: Clock },
    { id: 'deposit', label: 'Deposit', icon: Plus },
    { id: 'withdraw', label: 'Withdraw', icon: Minus },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Wallet</h1>
        <p className="text-gray-600 mt-1">Manage your earnings and transactions</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-white/80 text-lg mb-2">Total Balance</p>
            <p className="text-4xl md:text-5xl font-bold mb-4">${user?.balance.toFixed(2)}</p>
            <div className="flex items-center space-x-4 text-white/90">
              <div>
                <p className="text-sm">Total Earned</p>
                <p className="font-bold">${user?.totalEarned.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm">Tasks Completed</p>
                <p className="font-bold">{user?.tasksCompleted}</p>
              </div>
            </div>
          </div>
          <div className="mt-6 md:mt-0">
            <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4">
              <WalletIcon className="h-12 w-12 text-white/80" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-primary-600 border-b-2 border-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <IconComponent size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button
                onClick={() => setActiveTab('deposit')}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-200"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500 rounded-lg">
                    <Plus className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">Add Funds</span>
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
                  <span className="font-medium text-gray-900">Withdraw</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium text-gray-900">P2P Trading</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
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
                  className="flex items-center space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gray-100">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{transaction.title}</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <p className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Transaction History</h3>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <div className="p-3 rounded-lg bg-gray-100">
                  {getTransactionIcon(transaction.type)}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{transaction.title}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(transaction.status)}
                    <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
                    <span className="text-gray-300">•</span>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
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
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Add Funds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Credit/Debit Card</p>
                    <p className="text-sm text-gray-600">Instant deposit with 2.9% fee</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Smartphone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Mobile Payment</p>
                    <p className="text-sm text-gray-600">PayPal, Apple Pay, Google Pay</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-4">Deposit Amount</h4>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex space-x-2">
                  {[10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      className="flex-1 py-2 px-3 text-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'withdraw' && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Withdraw Funds</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">PayPal</p>
                    <p className="text-sm text-gray-600">1-2 business days • No fee</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CreditCard className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Bank Transfer</p>
                    <p className="text-sm text-gray-600">3-5 business days • $2 fee</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-medium text-gray-900 mb-4">Withdrawal Details</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Available Balance</p>
                  <p className="text-lg font-bold text-gray-900">${user?.balance.toFixed(2)}</p>
                </div>
                <input
                  type="number"
                  placeholder="Enter amount to withdraw"
                  max={user?.balance}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500">Minimum withdrawal: $10.00</p>
                <button className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 font-medium">
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wallet;