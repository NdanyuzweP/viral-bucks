import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  DollarSign, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Award,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Current Balance',
      value: `$${user?.balance.toFixed(2)}`,
      icon: DollarSign,
      color: 'from-primary-500 to-primary-600',
      change: '+12.5%',
      changeType: 'positive',
    },
    {
      title: 'Total Earned',
      value: `$${user?.totalEarned.toFixed(2)}`,
      icon: TrendingUp,
      color: 'from-secondary-500 to-secondary-600',
      change: '+8.2%',
      changeType: 'positive',
    },
    {
      title: 'Tasks Completed',
      value: user?.tasksCompleted.toString() || '0',
      icon: CheckCircle,
      color: 'from-accent-500 to-accent-600',
      change: '+3',
      changeType: 'positive',
    },
    {
      title: 'Active Tasks',
      value: '5',
      icon: Clock,
      color: 'from-orange-500 to-orange-600',
      change: '-1',
      changeType: 'negative',
    },
  ];

  const recentActivities = [
    {
      type: 'task_completed',
      title: 'Instagram Follow Task',
      amount: '+$2.50',
      time: '2 hours ago',
      icon: CheckCircle,
    },
    {
      type: 'p2p_trade',
      title: 'USDT Sale',
      amount: '+$50.00',
      time: '5 hours ago',
      icon: TrendingUp,
    },
    {
      type: 'task_completed',
      title: 'Survey Completion',
      amount: '+$5.00',
      time: '1 day ago',
      icon: Award,
    },
    {
      type: 'referral',
      title: 'Referral Bonus',
      amount: '+$15.00',
      time: '2 days ago',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-4 px-4 pb-20">
      {/* Welcome Section - Mobile Optimized */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-xl p-4 text-white">
        <div>
          <h1 className="text-xl font-bold mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-white/90 text-sm mb-4">
            Ready to earn some money today? You have 5 new tasks waiting!
          </p>
          <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-4 py-2 rounded-lg font-medium text-sm w-full transition-all duration-200">
            View Available Tasks
          </button>
        </div>
      </div>

      {/* Stats Grid - 2x2 for mobile */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <IconComponent className="h-4 w-4 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-500" />
                  )}
                  <span
                    className={`text-xs font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions - Mobile First */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-primary-600" />
              <span className="font-medium text-gray-900">Browse Tasks</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-secondary-50 to-accent-50 hover:from-secondary-100 hover:to-accent-100 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-5 w-5 text-secondary-600" />
              <span className="font-medium text-gray-900">P2P Trading</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-accent-50 to-primary-50 hover:from-accent-100 hover:to-primary-100 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-accent-600" />
              <span className="font-medium text-gray-900">Invite Friends</span>
            </div>
            <ArrowUpRight className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Achievement Card */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-4 text-white">
        <div className="flex items-center space-x-3 mb-3">
          <Award className="h-5 w-5" />
          <h3 className="text-base font-bold">Achievement Unlocked!</h3>
        </div>
        <p className="text-white/90 text-sm">
          You've completed 20+ tasks this month. Keep up the great work!
        </p>
      </div>

      {/* Recent Activity - Mobile Optimized */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-gradient-to-r from-primary-100 to-secondary-100">
                  <IconComponent className="h-4 w-4 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-sm">{activity.amount}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;