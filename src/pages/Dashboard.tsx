import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  CheckSquare, 
  UserPlus, 
  BookOpen, 
  Heart,
  TrendingUp,
  Clock,
  Award,
  Target
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    
    switch (user?.role) {
      case 'pastor':
        return `${greeting}, Pastor ${user.full_name}`;
      case 'worker':
        return `${greeting}, ${user.full_name}`;
      case 'member':
        return `${greeting}, ${user.full_name}`;
      case 'newcomer':
        return `Welcome to our church, ${user.full_name}!`;
      default:
        return `${greeting}, ${user?.full_name}`;
    }
  };

  const getQuickStats = () => {
    if (user?.role === 'pastor' || user?.role === 'worker') {
      return [
        { name: 'Total Members', value: '156', icon: Users, change: '+12%', changeType: 'increase' },
        { name: 'This Week\'s Attendance', value: '89', icon: Calendar, change: '+5%', changeType: 'increase' },
        { name: 'Active Programs', value: '12', icon: BookOpen, change: '+2', changeType: 'increase' },
        { name: 'Souls Won This Month', value: '8', icon: Heart, change: '+3', changeType: 'increase' },
      ];
    }
    return [];
  };

  const getRecentActivity = () => {
    if (user?.role === 'pastor' || user?.role === 'worker') {
      return [
        { action: 'New member registered', user: 'Sarah Johnson', time: '2 hours ago', type: 'member' },
        { action: 'Task completed', user: 'Mary Wilson', time: '4 hours ago', type: 'task' },
        { action: 'Program attendance recorded', user: 'Bible Study', time: '1 day ago', type: 'program' },
        { action: 'Newcomer form submitted', user: 'David Brown', time: '2 days ago', type: 'newcomer' },
      ];
    }
    return [];
  };

  const getUpcomingEvents = () => {
    return [
      { name: 'Sunday Morning Service', date: 'Tomorrow', time: '10:00 AM', type: 'service' },
      { name: 'Bible Study', date: 'Wednesday', time: '7:00 PM', type: 'study' },
      { name: 'Youth Meeting', date: 'Friday', time: '6:00 PM', type: 'youth' },
      { name: 'Prayer Meeting', date: 'Saturday', time: '8:00 AM', type: 'prayer' },
    ];
  };

  const quickStats = getQuickStats();
  const recentActivity = getRecentActivity();
  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {getWelcomeMessage()}
        </h1>
        <p className="text-gray-600">
          Here's what's happening at {user?.church_name || 'your church'} today.
        </p>
      </div>

      {/* Role-specific welcome message for newcomers */}
      {user?.role === 'newcomer' && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserPlus className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-blue-900">
              Welcome to our church family!
            </h2>
          </div>
          <p className="text-blue-800 mb-4">
            We're so glad you're here. Please take a moment to complete your newcomer information 
            so we can better serve you and help you get connected.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Complete Your Profile
          </button>
        </div>
      )}

      {/* Quick Stats */}
      {quickStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{event.name}</p>
                  <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.type === 'member' && <Users className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'task' && <CheckSquare className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'program' && <BookOpen className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'newcomer' && <UserPlus className="h-4 w-4 text-blue-600" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions for Members/Newcomers */}
        {(user?.role === 'member' || user?.role === 'newcomer') && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="font-medium text-blue-900">Mark Today's Attendance</span>
                <CheckSquare className="h-5 w-5 text-blue-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="font-medium text-green-900">View Church Programs</span>
                <BookOpen className="h-5 w-5 text-green-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="font-medium text-purple-900">Update Profile</span>
                <Users className="h-5 w-5 text-purple-600" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Personal Stats for Members */}
      {user?.role === 'member' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">Attendance Rate</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Services Attended</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Programs Joined</p>
          </div>
        </div>
      )}
    </div>
  );
}