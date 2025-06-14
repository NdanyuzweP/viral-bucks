import React, { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  CheckSquare, 
  TrendingUp, 
  User, 
  Wallet,
  LogOut,
  Menu,
  X
  
} from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/p2p', icon: TrendingUp, label: 'P2P Trade' },
    { path: '/wallet', icon: Wallet, label: 'Wallet' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-20 lg:pb-24">
      {/* Top Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">V</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Vilarbucks
            </h1>
          </div>
          
          {/* User Info & Menu Toggle */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              <span className="text-sm text-gray-500">${user?.balance.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-8 h-8 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center relative"
            >
              <span className="text-white font-bold text-sm">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </button>
          </div>
        </div>
        
        {/* Profile Dropdown Menu */}
        {isProfileMenuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-lg border rounded-lg z-50 w-48 animate-slide-up">
            <div className="p-4">
              <div className="flex items-center space-x-3 pb-3 border-b">
                <div className="w-10 h-10 bg-gradient-to-r from-accent-400 to-accent-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500">${user?.balance.toFixed(2)}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-2 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-3"
              >
                <LogOut size={18} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1">
        <div className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50">
        <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? 'text-primary-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`p-1 rounded-lg ${
                  isActive ? 'bg-primary-100' : ''
                }`}>
                  <IconComponent size={24} className={isActive ? 'text-primary-600' : ''} />
                </div>
                {/* Show labels on larger screens, hide on mobile */}
                <span className={`text-xs mt-1 font-medium hidden sm:block ${
                  isActive ? 'text-primary-600' : 'text-gray-500'
                }`}>
                  {item.label}
                </span>
                {/* Show only on mobile for active state */}
                <span className={`text-xs mt-1 font-medium sm:hidden ${
                  isActive ? 'text-primary-600' : 'transparent'
                }`}>
                  {isActive ? '•' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Overlay for profile menu */}
      {isProfileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-20"
          onClick={() => setIsProfileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;