import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { 
  Settings, 
  Church, 
  Users, 
  Palette, 
  Globe, 
  CreditCard,
  Mail,
  Phone,
  MapPin,
  Save,
  UserPlus,
  Shield
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const { primaryColor, setPrimaryColor, font, setFont } = useTheme();
  const { isActive } = useSubscription();

  const [churchInfo, setChurchInfo] = useState({
    name: 'Grace Community Church',
    address: '123 Church Street, City, State 12345',
    phone: '+1-555-123-4567',
    email: 'info@gracechurch.com',
    website: 'www.gracechurch.com',
    pastor: 'Pastor John Smith'
  });

  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('member');

  const colorOptions = [
    { name: 'Blue', value: '#3B82F6' },
    { name: 'Green', value: '#10B981' },
    { name: 'Purple', value: '#8B5CF6' },
    { name: 'Red', value: '#EF4444' },
    { name: 'Orange', value: '#F97316' },
    { name: 'Pink', value: '#EC4899' },
    { name: 'Indigo', value: '#6366F1' },
    { name: 'Teal', value: '#14B8A6' }
  ];

  const fontOptions = [
    'Inter',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins'
  ];

  const handleSaveChurchInfo = () => {
    // Save church info logic
    console.log('Saving church info:', churchInfo);
  };

  const handleInviteUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Invite user logic
    console.log('Inviting user:', inviteEmail, inviteRole);
    setInviteEmail('');
  };

  // Only pastors can access settings
  if (user?.role !== 'pastor') {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Shield className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Access Restricted</h3>
          <p className="text-gray-600">Only pastors can access church settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Configure church settings and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Church Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Church className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Church Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Church Name
                </label>
                <input
                  type="text"
                  value={churchInfo.name}
                  onChange={(e) => setChurchInfo({...churchInfo, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pastor Name
                </label>
                <input
                  type="text"
                  value={churchInfo.pastor}
                  onChange={(e) => setChurchInfo({...churchInfo, pastor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  value={churchInfo.address}
                  onChange={(e) => setChurchInfo({...churchInfo, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={churchInfo.phone}
                  onChange={(e) => setChurchInfo({...churchInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={churchInfo.email}
                  onChange={(e) => setChurchInfo({...churchInfo, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={churchInfo.website}
                  onChange={(e) => setChurchInfo({...churchInfo, website: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={handleSaveChurchInfo}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Church Information
            </button>
          </div>

          {/* Appearance Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-6">
              <Palette className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Appearance</h3>
            </div>
            
            <div className="space-y-6">
              {/* Primary Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Primary Color
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setPrimaryColor(color.value)}
                      className={`w-full h-12 rounded-lg border-2 transition-all ${
                        primaryColor === color.value ? 'border-gray-900 scale-105' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Family
                </label>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {fontOptions.map((fontOption) => (
                    <option key={fontOption} value={fontOption}>
                      {fontOption}
                    </option>
                  ))}
                </select>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="en">English</option>
                  <option value="de">Deutsch (German)</option>
                  <option value="fr">Français (French)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="pt">Português (Portuguese)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Subscription Status */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <CreditCard className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Subscription</h3>
            </div>
            
            <div className={`p-4 rounded-lg ${isActive ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">Status</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                {isActive 
                  ? 'Your subscription is active. All features are available.'
                  : 'Your subscription is inactive. Please renew to continue using all features.'
                }
              </p>
              <button className={`w-full px-4 py-2 rounded-md text-white font-medium ${
                isActive ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'
              }`}>
                {isActive ? 'Manage Subscription' : 'Activate Subscription'}
              </button>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
            </div>
            
            <form onSubmit={handleInviteUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="user@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="member">Member</option>
                  <option value="worker">Worker</option>
                  <option value="newcomer">Newcomer</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Send Invitation
              </button>
            </form>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Users</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Programs</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">This Month's Attendance</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Souls Won</span>
                <span className="font-medium">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}