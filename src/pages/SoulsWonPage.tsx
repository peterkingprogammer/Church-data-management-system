import React, { useState } from 'react';
import { Heart, Plus, User, Calendar, BookOpen, MessageCircle } from 'lucide-react';

export default function SoulsWonPage() {
  const [soulsWon] = useState([
    {
      id: 1,
      name: 'Jennifer Martinez',
      age: 24,
      phone: '+1-555-0125',
      program: 'Sunday Morning Service',
      counselor: 'Pastor John Smith',
      date: '2024-01-21',
      notes: 'Responded during altar call, very emotional and sincere decision'
    },
    {
      id: 2,
      name: 'Robert Johnson',
      age: 31,
      phone: '+1-555-0126',
      program: 'Wednesday Bible Study',
      counselor: 'Mary Wilson',
      date: '2024-01-17',
      notes: 'Had been attending for weeks, finally made decision during prayer'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      age: 28,
      phone: '+1-555-0127',
      program: 'Youth Friday Night',
      counselor: 'David Brown',
      date: '2024-01-19',
      notes: 'Young professional, brought by friend, very receptive to gospel'
    }
  ]);

  const [newSoul, setNewSoul] = useState({
    name: '',
    age: '',
    phone: '',
    program: '',
    counselor: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add soul won logic here
    setNewSoul({
      name: '',
      age: '',
      phone: '',
      program: '',
      counselor: '',
      notes: ''
    });
  };

  const getMonthlyStats = () => {
    const thisMonth = soulsWon.filter(soul => 
      new Date(soul.date).getMonth() === new Date().getMonth()
    );
    return thisMonth.length;
  };

  const getProgramStats = () => {
    const programCounts: { [key: string]: number } = {};
    soulsWon.forEach(soul => {
      programCounts[soul.program] = (programCounts[soul.program] || 0) + 1;
    });
    return programCounts;
  };

  const programStats = getProgramStats();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Souls Won</h1>
          <p className="text-gray-600">Track spiritual decisions and conversions</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium text-green-600">{getMonthlyStats()}</span> souls this month
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Record Soul Won
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Record New Soul */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Record New Decision</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                value={newSoul.name}
                onChange={(e) => setNewSoul({...newSoul, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
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
                value={newSoul.age}
                onChange={(e) => setNewSoul({...newSoul, age: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Age..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newSoul.phone}
                onChange={(e) => setNewSoul({...newSoul, phone: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="+1-555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Program/Event
              </label>
              <select
                value={newSoul.program}
                onChange={(e) => setNewSoul({...newSoul, program: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select program...</option>
                <option value="Sunday Morning Service">Sunday Morning Service</option>
                <option value="Wednesday Bible Study">Wednesday Bible Study</option>
                <option value="Youth Friday Night">Youth Friday Night</option>
                <option value="Prayer Meeting">Prayer Meeting</option>
                <option value="Special Event">Special Event</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Counselor
              </label>
              <select
                value={newSoul.counselor}
                onChange={(e) => setNewSoul({...newSoul, counselor: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select counselor...</option>
                <option value="Pastor John Smith">Pastor John Smith</option>
                <option value="Mary Wilson">Mary Wilson</option>
                <option value="David Brown">David Brown</option>
                <option value="Sarah Johnson">Sarah Johnson</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={newSoul.notes}
                onChange={(e) => setNewSoul({...newSoul, notes: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Additional details about the decision..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Record Decision
            </button>
          </form>
        </div>

        {/* Souls Won List */}
        <div className="lg:col-span-2 space-y-4">
          {soulsWon.map((soul) => (
            <div key={soul.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <Heart className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{soul.name}</h3>
                    <p className="text-sm text-gray-600">Age: {soul.age}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {soul.date}
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    New Convert
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Program: {soul.program}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="h-4 w-4 mr-2" />
                    Counselor: {soul.counselor}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Phone: {soul.phone}
                  </div>
                </div>
              </div>

              {soul.notes && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Notes:</h4>
                  <p className="text-sm text-gray-600">{soul.notes}</p>
                </div>
              )}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Decision recorded on {soul.date}
                  </span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                      Follow Up
                    </button>
                    <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                      Add to Members
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Souls Won</p>
              <p className="text-2xl font-bold text-green-600">{soulsWon.length}</p>
            </div>
            <Heart className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600">{getMonthlyStats()}</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Most Effective</p>
              <p className="text-lg font-bold text-purple-600">
                {Object.entries(programStats).sort(([,a], [,b]) => b - a)[0]?.[0]?.split(' ')[0] || 'N/A'}
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Follow-ups Needed</p>
              <p className="text-2xl font-bold text-orange-600">2</p>
            </div>
            <User className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );
}