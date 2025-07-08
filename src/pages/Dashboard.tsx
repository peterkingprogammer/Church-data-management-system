import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  UserPlus, 
  BookOpen, 
  Heart,
  History,
  Settings,
  LogOut,
  Church
} from 'lucide-react';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
  };

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'pastor':
        return `Welcome back, Pastor ${user.full_name}`;
      case 'worker':
        return `Welcome back, ${user.full_name}`;
      case 'member':
        return `Welcome, ${user.full_name}`;
      case 'newcomer':
        return `Welcome to our church, ${user.full_name}!`;
      default:
        return `Welcome, ${user?.full_name}`;
    }
  };

  const getAvailableModules = () => {
    const allModules = [
      { name: 'Folders', icon: Users, description: 'Organize church programs and resources' },
      { name: 'Calendar', icon: Calendar, description: 'Schedule and manage church events' },
      { name: 'Tasks', icon: CheckSquare, description: 'Assign and track tasks' },
      { name: 'Newcomers', icon: UserPlus, description: 'Manage new visitors' },
      { name: 'Programs', icon: BookOpen, description: 'Church programs and attendance' },
      { name: 'Souls Won', icon: Heart, description: 'Track spiritual decisions' },
      { name: 'History', icon: History, description: 'View activity history' },
      { name: 'Settings', icon: Settings, description: 'Configure church settings' }
    ];

    // Filter modules based on user role
    switch (user?.role) {
      case 'pastor':
        return allModules; // Pastor has access to all modules
      case 'worker':
        return allModules.filter(m => m.name !== 'Settings'); // Worker has access to most modules
      case 'member':
        return allModules.filter(m => ['Programs', 'Calendar'].includes(m.name)); // Member has limited access
      case 'newcomer':
        return allModules.filter(m => m.name === 'Programs'); // Newcomer has very limited access
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Church className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">
                {t('app.title')}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {user?.church_name}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center text-sm text-gray-600 hover:text-gray-900"
              >
                <LogOut className="h-4 w-4 mr-1" />
                {t('nav.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {getWelcomeMessage()}
          </h2>
          <p className="text-gray-600">
            Role: <span className="capitalize font-medium">{user?.role}</span>
          </p>
        </div>

        {/* Role-specific content */}
        {user?.role === 'newcomer' && (
          <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Welcome to our church family!
            </h3>
            <p className="text-blue-800">
              We're so glad you're here. Please take a moment to complete your newcomer information 
              so we can better serve you and help you get connected.
            </p>
          </div>
        )}

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getAvailableModules().map((module) => {
            const IconComponent = module.icon;
            return (
              <div
                key={module.name}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-900">
                    {module.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">
                  {module.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quick Stats (for Pastor and Worker) */}
        {(user?.role === 'pastor' || user?.role === 'worker') && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Total Members</h4>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-sm font-medium text-gray-600 mb-2">This Week's Attendance</h4>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Active Programs</h4>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        )}

        {/* Subscription Notice (for Pastor only) */}
        {user?.role === 'pastor' && (
          <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Subscription Active
            </h3>
            <p className="text-green-800">
              Your church management system is fully activated. All features are available.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}