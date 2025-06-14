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
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-white/90 text-lg">
              Ready to earn some money today? You have 5 new tasks waiting!
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105">
              View Available Tasks
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-primary-100 to-secondary-100">
                    <IconComponent className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{activity.amount}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Available Tasks */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary-600" />
                  <span className="font-medium text-gray-900">Browse Tasks</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-secondary-50 to-accent-50 hover:from-secondary-100 hover:to-accent-100 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-secondary-600" />
                  <span className="font-medium text-gray-900">P2P Trading</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
              
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-accent-50 to-primary-50 hover:from-accent-100 hover:to-primary-100 transition-all duration-200">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-accent-600" />
                  <span className="font-medium text-gray-900">Invite Friends</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Achievement */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center space-x-3 mb-3">
              <Award className="h-6 w-6" />
              <h3 className="text-lg font-bold">Achievement Unlocked!</h3>
            </div>
            <p className="text-white/90">
              You've completed 20+ tasks this month. Keep up the great work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;