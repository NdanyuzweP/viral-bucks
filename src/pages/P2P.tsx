import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Shield,
  MessageCircle,
  Plus,
  Search,
  ChevronDown,
  Star
} from 'lucide-react';

// Mock data for demo
const mockP2POrders = [
  {
    id: 1,
    userName: 'CryptoKing',
    type: 'sell',
    price: 0.998,
    amount: 50000,
    minAmount: 100,
    maxAmount: 5000,
    paymentMethods: ['PayPal', 'Bank Transfer'],
    isActive: true,
    completionRate: 98,
    trades: 1247
  },
  {
    id: 2,
    userName: 'TraderPro',
    type: 'sell',
    price: 0.999,
    amount: 25000,
    minAmount: 50,
    maxAmount: 2500,
    paymentMethods: ['Cash App', 'Venmo'],
    isActive: true,
    completionRate: 100,
    trades: 856
  },
  {
    id: 3,
    userName: 'SafeTrader',
    type: 'buy',
    price: 1.001,
    amount: 30000,
    minAmount: 200,
    maxAmount: 3000,
    paymentMethods: ['Zelle', 'Bank Transfer'],
    isActive: true,
    completionRate: 95,
    trades: 432
  }
];

const P2P: React.FC = () => {
  const [orders] = useState(mockP2POrders);
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

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
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {order.userName.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{order.userName}</p>
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                <span className="text-xs text-gray-600 ml-1">{order.completionRate}%</span>
              </div>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-600">{order.trades} trades</span>
            </div>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          order.type === 'buy' 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {order.type === 'buy' ? 'BUY' : 'SELL'}
        </div>
      </div>

      {/* Price and Amount */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Price</p>
          <p className="text-lg font-bold text-gray-900">${order.price.toFixed(3)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-600 mb-1">Available</p>
          <p className="text-lg font-bold text-gray-900">{order.amount.toLocaleString()}</p>
          <p className="text-xs text-gray-500">USDT</p>
        </div>
      </div>

      {/* Limits */}
      <div className="flex justify-between items-center mb-3 text-sm">
        <span className="text-gray-600">Limits:</span>
        <span className="font-medium text-gray-900">${order.minAmount} - ${order.maxAmount}</span>
      </div>

      {/* Payment Methods */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {order.paymentMethods.map((method: string) => (
            <span
              key={method}
              className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium"
            >
              {method}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium text-sm">
          {order.type === 'sell' ? 'Buy USDT' : 'Sell USDT'}
        </button>
        <button className="p-3 border border-gray-300 rounded-lg">
          <MessageCircle className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">P2P Trading</h1>
            <p className="text-sm text-gray-600">Trade USDT directly</p>
          </div>
          <button className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* Market Stats */}
      {/* <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-sm font-bold text-green-600">$0.998</p>
            <p className="text-xs text-gray-500">Best Buy</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingDown className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-sm font-bold text-red-600">$1.002</p>
            <p className="text-xs text-gray-500">Best Sell</p>
          </div>
          
          <div className="bg-white rounded-lg p-3 text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-blue-500" />
            </div>
            <p className="text-sm font-bold text-blue-600">$2.4M</p>
            <p className="text-xs text-gray-500">24h Vol</p>
          </div>
        </div>
      </div> */}

      {/* Tabs */}
      <div className="px-4 mb-4">
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('buy')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md font-medium transition-all text-sm ${
              activeTab === 'buy'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            <TrendingUp size={16} />
            <span>Buy USDT</span>
          </button>
          <button
            onClick={() => setActiveTab('sell')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md font-medium transition-all text-sm ${
              activeTab === 'sell'
                ? 'bg-white text-red-600 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            <TrendingDown size={16} />
            <span>Sell USDT</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="px-4 mb-4">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search traders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-between w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700"
        >
          <span>{selectedPaymentMethod === 'all' ? 'All Payment Methods' : selectedPaymentMethod}</span>
          <ChevronDown size={16} />
        </button>
        
        {showFilters && (
          <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-sm">
            {paymentMethods.map((method) => (
              <button
                key={method}
                onClick={() => {
                  setSelectedPaymentMethod(method);
                  setShowFilters(false);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
              >
                {method === 'all' ? 'All Payment Methods' : method}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Orders List */}
      <div className="px-4 pb-20">
        {filteredOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="font-medium text-gray-900 mb-1">No orders found</h3>
            <p className="text-sm text-gray-600">Try different filters or create your own order</p>
          </div>
        )}
      </div>

      {/* Safety Tip - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-100 px-4 py-3">
        <div className="flex items-start space-x-2">
          <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-medium text-blue-900">Safety First!</p>
            <p className="text-xs text-blue-800">Always verify payment before releasing USDT</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default P2P;