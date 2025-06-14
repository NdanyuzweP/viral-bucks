import React, { useState } from 'react';
import { mockP2POrders } from '../data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock,
  Shield,
  MessageCircle,
  Filter,
  Plus,
  Search
} from 'lucide-react';

const P2P: React.FC = () => {
  const [orders] = useState(mockP2POrders);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const paymentMethods = [
    'all',
    'PayPal',
    'Bank Transfer',
    'Cash App',
    'Venmo',
    'Zelle',
  ];

  const filteredOrders = orders.filter(order => {
    const matchesTab = order.type === (activeTab === 'buy' ? 'sell' : 'buy');
    const matchesPayment = selectedPaymentMethod === 'all' || 
      order.paymentMethods.includes(selectedPaymentMethod);
    const matchesSearch = order.userName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesPayment && matchesSearch && order.isActive;
  });

  const OrderCard = ({ order }: { order: any }) => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary-400 to-secondary-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {order.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-bold text-gray-900">{order.userName}</p>
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-600">Verified</span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.type === 'buy' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {order.type === 'buy' ? 'BUYING' : 'SELLING'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Price</p>
          <p className="text-lg font-bold text-gray-900">${order.price.toFixed(3)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Available</p>
          <p className="text-lg font-bold text-gray-900">{order.amount} USDT</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Min Amount</p>
          <p className="text-sm font-medium text-gray-700">${order.minAmount}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Max Amount</p>
          <p className="text-sm font-medium text-gray-700">${order.maxAmount}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Payment Methods</p>
        <div className="flex flex-wrap gap-2">
          {order.paymentMethods.map((method: string) => (
            <span
              key={method}
              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 font-medium">
          {order.type === 'sell' ? 'Buy USDT' : 'Sell USDT'}
        </button>
        <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
          <MessageCircle className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">P2P Trading</h1>
          <p className="text-gray-600 mt-1">Buy and sell USDT directly with other users</p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 font-medium">
          <Plus size={20} />
          <span>Create Order</span>
        </button>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="font-medium text-gray-900">Best Buy Price</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-green-600">$0.998</p>
          <p className="text-sm text-gray-500">+0.12% from yesterday</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-red-500" />
              <span className="font-medium text-gray-900">Best Sell Price</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-red-600">$1.002</p>
          <p className="text-sm text-gray-500">-0.08% from yesterday</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-blue-500" />
              <span className="font-medium text-gray-900">24h Volume</span>
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-600">$2.4M</p>
          <p className="text-sm text-gray-500">1,247 trades</p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'buy'
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingUp size={20} />
            <span>I want to Buy</span>
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'sell'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <TrendingDown size={20} />
            <span>I want to Sell</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by username..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method === 'all' ? 'All Payment Methods' : method}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your filters or create your own order.</p>
        </div>
      )}

      {/* Trading Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-start space-x-3">
          <Shield className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-bold text-blue-900 mb-2">Trading Safety Tips</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Always verify payment before releasing USDT</li>
              <li>• Use secure payment methods with transaction records</li>
              <li>• Check trader's reputation and completion rate</li>
              <li>• Report suspicious activity immediately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2P;