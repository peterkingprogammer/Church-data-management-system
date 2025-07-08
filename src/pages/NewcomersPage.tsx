import React, { useState } from 'react';
import { UserPlus, Phone, Mail, MapPin, Calendar, User } from 'lucide-react';

export default function NewcomersPage() {
  const [newcomers] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      age: 28,
      phone: '+1-555-0123',
      email: 'sarah.johnson@email.com',
      address: '123 Main St, City, State 12345',
      firstVisit: '2024-01-21',
      howFound: 'Friend invitation',
      referredBy: 'Mary Wilson',
      isFirstTimer: true,
      notes: 'Interested in joining the choir',
      status: 'new'
    },
    {
      id: 2,
      name: 'Michael Brown',
      age: 35,
      phone: '+1-555-0124',
      email: 'michael.brown@email.com',
      address: '456 Oak Ave, City, State 12345',
      firstVisit: '2024-01-14',
      howFound: 'Online search',
      referredBy: '',
      isFirstTimer: false,
      notes: 'Has two children, interested in youth programs',
      status: 'contacted'
    }
  ]);

  const [newNewcomer, setNewNewcomer] = useState({
    name: '',
    age: '',
    phone: '',
    email: '',
    address: '',
    howFound: '',
    referredBy: '',
    isFirstTimer: false,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add newcomer logic here
    setNewNewcomer({
      name: '',
      age: '',
      phone: '',
      email: '',
      address: '',
      howFound: '',
      referredBy: '',
      isFirstTimer: false,
      notes: ''
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Newcomers</h1>
          <p className="text-gray-600">Welcome and track new visitors</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">{newcomers.length}</span> newcomers this month
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Newcomer Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Visitor</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={newNewcomer.name}
                onChange={(e) => setNewNewcomer({...newNewcomer, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter full name..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                value={newNewcomer.age}
                onChange={(e) => setNewNewcomer({...newNewcomer, age: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Age..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newNewcomer.phone}
                onChange={(e) => setNewNewcomer({...newNewcomer, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+1-555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={newNewcomer.email}
                onChange={(e) => setNewNewcomer({...newNewcomer, email: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <textarea
                value={newNewcomer.address}
                onChange={(e) => setNewNewcomer({...newNewcomer, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Full address..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How did you find us?
              </label>
              <select
                value={newNewcomer.howFound}
                onChange={(e) => setNewNewcomer({...newNewcomer, howFound: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select option...</option>
                <option value="Friend invitation">Friend invitation</option>
                <option value="Online search">Online search</option>
                <option value="Social media">Social media</option>
                <option value="Flyer/Advertisement">Flyer/Advertisement</option>
                <option value="Walking by">Walking by</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Referred by (if applicable)
              </label>
              <input
                type="text"
                value={newNewcomer.referredBy}
                onChange={(e) => setNewNewcomer({...newNewcomer, referredBy: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Name of person who referred..."
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="firstTimer"
                checked={newNewcomer.isFirstTimer}
                onChange={(e) => setNewNewcomer({...newNewcomer, isFirstTimer: e.target.checked})}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="firstTimer" className="ml-2 block text-sm text-gray-700">
                First time visitor
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={newNewcomer.notes}
                onChange={(e) => setNewNewcomer({...newNewcomer, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Any additional information..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Newcomer
            </button>
          </form>
        </div>

        {/* Newcomers List */}
        <div className="lg:col-span-2 space-y-4">
          {newcomers.map((newcomer) => (
            <div key={newcomer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <UserPlus className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{newcomer.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Age: {newcomer.age}</span>
                      {newcomer.isFirstTimer && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          First Timer
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                    Contact
                  </button>
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                    Follow Up
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {newcomer.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {newcomer.email}
                  </div>
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                    <span>{newcomer.address}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    First visit: {newcomer.firstVisit}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Found us: {newcomer.howFound}
                  </div>
                  {newcomer.referredBy && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      Referred by: {newcomer.referredBy}
                    </div>
                  )}
                </div>
              </div>

              {newcomer.notes && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Notes:</h4>
                  <p className="text-sm text-gray-600">{newcomer.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Newcomers</p>
              <p className="text-2xl font-bold text-gray-900">{newcomers.length}</p>
            </div>
            <UserPlus className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">First Timers</p>
              <p className="text-2xl font-bold text-green-600">
                {newcomers.filter(n => n.isFirstTimer).length}
              </p>
            </div>
            <User className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-purple-600">3</p>
            </div>
            <Calendar className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Follow-ups Needed</p>
              <p className="text-2xl font-bold text-orange-600">1</p>
            </div>
            <Phone className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}