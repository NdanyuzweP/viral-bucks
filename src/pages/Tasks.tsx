import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockTasks } from '../data/mockData';
import { 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Filter,
  Star,
  Play,
  ExternalLink,
  Award
} from 'lucide-react';

const Tasks: React.FC = () => {
  const { updateBalance } = useAuth();
  const [tasks, setTasks] = useState(mockTasks);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<string | null>(null);

  const categories = [
    { value: 'all', label: 'All Tasks', icon: Star },
    { value: 'social', label: 'Social Media', icon: Star },
    { value: 'survey', label: 'Surveys', icon: CheckCircle },
    { value: 'app', label: 'App Downloads', icon: ExternalLink },
    { value: 'video', label: 'Watch Videos', icon: Play },
    { value: 'referral', label: 'Referrals', icon: Award },
  ];

  const difficultyColors = {
    easy: 'from-green-400 to-green-600',
    medium: 'from-yellow-400 to-orange-500',
    hard: 'from-red-400 to-red-600',
  };

  const categoryColors = {
    social: 'from-pink-400 to-purple-600',
    survey: 'from-blue-400 to-blue-600',
    app: 'from-green-400 to-teal-600',
    video: 'from-red-400 to-pink-600',
    referral: 'from-purple-400 to-indigo-600',
  };

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const handleCompleteTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { ...t, isCompleted: true, completedAt: new Date() }
          : t
      ));
      updateBalance(task.reward);
      setSelectedTask(null);
    }
  };

  const TaskModal = ({ task }: { task: any }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${categoryColors[task.category as keyof typeof categoryColors]}`}>
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </div>
            <button
              onClick={() => setSelectedTask(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ✕
            </button>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">{task.title}</h3>
          <p className="text-gray-600 mb-6">{task.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary-600" />
                <span className="font-bold text-primary-900">${task.reward.toFixed(2)}</span>
              </div>
              <p className="text-sm text-primary-700">Reward</p>
            </div>
            <div className="bg-gradient-to-r from-secondary-50 to-secondary-100 p-4 rounded-xl">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-secondary-600" />
                <span className="font-bold text-secondary-900">{task.timeToComplete}min</span>
              </div>
              <p className="text-sm text-secondary-700">Duration</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Steps to Complete:</h4>
            <div className="space-y-2">
              {task.steps.map((step: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setSelectedTask(null)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => handleCompleteTask(task.id)}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              Complete Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Available Tasks</h1>
          <p className="text-gray-600 mt-1">Complete tasks and earn money instantly</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4" />
            <span>All times in minutes</span>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-3 mb-4">
          <Filter className="h-5 w-5 text-gray-400" />
          <h2 className="font-bold text-gray-900">Filter by Category</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <IconComponent size={16} />
                <span className="font-medium">{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 transform hover:scale-105 ${
              task.isCompleted ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${categoryColors[task.category as keyof typeof categoryColors]}`}>
                {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${difficultyColors[task.difficulty]} text-white`}>
                {task.difficulty.toUpperCase()}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 mb-2">{task.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="font-bold text-green-600">${task.reward.toFixed(2)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{task.timeToComplete}min</span>
                </div>
              </div>
            </div>

            {task.isCompleted ? (
              <div className="flex items-center justify-center py-3 px-4 bg-green-100 text-green-700 rounded-xl">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">Completed</span>
              </div>
            ) : (
              <button
                onClick={() => setSelectedTask(task.id)}
                className="w-full py-3 px-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 transform hover:scale-105 font-medium"
              >
                Start Task
              </button>
            )}
          </div>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600">Try selecting a different category or check back later for new tasks.</p>
        </div>
      )}

      {/* Task Modal */}
      {selectedTask && (
        <TaskModal task={tasks.find(t => t.id === selectedTask)} />
      )}
    </div>
  );
};

export default Tasks;