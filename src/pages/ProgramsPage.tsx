import React, { useState } from 'react';
import { BookOpen, Plus, Users, Calendar, Clock, MapPin } from 'lucide-react';

export default function ProgramsPage() {
  const [programs] = useState([
    {
      id: 1,
      name: 'Sunday Morning Service',
      type: 'service',
      description: 'Weekly worship service with sermon and communion',
      schedule: 'Sundays 10:00 AM',
      location: 'Main Sanctuary',
      attendance: 156,
      lastAttendance: '2024-01-21'
    },
    {
      id: 2,
      name: 'Wednesday Bible Study',
      type: 'study',
      description: 'In-depth Bible study and discussion',
      schedule: 'Wednesdays 7:00 PM',
      location: 'Fellowship Hall',
      attendance: 45,
      lastAttendance: '2024-01-17'
    },
    {
      id: 3,
      name: 'Youth Friday Night',
      type: 'youth',
      description: 'Youth fellowship and activities',
      schedule: 'Fridays 6:00 PM',
      location: 'Youth Room',
      attendance: 25,
      lastAttendance: '2024-01-19'
    },
    {
      id: 4,
      name: 'Prayer Meeting',
      type: 'prayer',
      description: 'Corporate prayer and intercession',
      schedule: 'Saturdays 8:00 AM',
      location: 'Prayer Room',
      attendance: 20,
      lastAttendance: '2024-01-20'
    }
  ]);

  const [attendanceRecords] = useState([
    { id: 1, programId: 1, date: '2024-01-21', members: 89, newcomers: 12, visitors: 8 },
    { id: 2, programId: 2, date: '2024-01-17', members: 38, newcomers: 5, visitors: 2 },
    { id: 3, programId: 3, date: '2024-01-19', members: 20, newcomers: 3, visitors: 2 },
    { id: 4, programId: 4, date: '2024-01-20', members: 18, newcomers: 1, visitors: 1 }
  ]);

  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [newAttendance, setNewAttendance] = useState({
    members: '',
    newcomers: '',
    visitors: ''
  });

  const getProgramTypeColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-800';
      case 'study': return 'bg-green-100 text-green-800';
      case 'youth': return 'bg-purple-100 text-purple-800';
      case 'prayer': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRecordAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    // Record attendance logic here
    setNewAttendance({
      members: '',
      newcomers: '',
      visitors: ''
    });
  };

  const getTotalAttendance = (programId: number) => {
    const record = attendanceRecords.find(r => r.programId === programId);
    if (!record) return 0;
    return record.members + record.newcomers + record.visitors;
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Programs</h1>
          <p className="text-gray-600">Church programs and attendance tracking</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Program
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(program.id)}
                className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition-all ${
                  selectedProgram === program.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{program.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getProgramTypeColor(program.type)}`}>
                        {program.type}
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {program.schedule}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {program.location}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {getTotalAttendance(program.id)} last attendance
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Attendance Statistics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attendance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {attendanceRecords.reduce((sum, record) => sum + record.members, 0)}
                </p>
                <p className="text-sm text-gray-600">Total Members</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {attendanceRecords.reduce((sum, record) => sum + record.newcomers, 0)}
                </p>
                <p className="text-sm text-gray-600">Newcomers</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {attendanceRecords.reduce((sum, record) => sum + record.visitors, 0)}
                </p>
                <p className="text-sm text-gray-600">Visitors</p>
              </div>
            </div>
          </div>
        </div>

        {/* Attendance Recording */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {selectedProgram ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Record Attendance
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                {programs.find(p => p.id === selectedProgram)?.name}
              </p>
              
              <form onSubmit={handleRecordAttendance} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Members Present
                  </label>
                  <input
                    type="number"
                    value={newAttendance.members}
                    onChange={(e) => setNewAttendance({...newAttendance, members: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of members..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Newcomers
                  </label>
                  <input
                    type="number"
                    value={newAttendance.newcomers}
                    onChange={(e) => setNewAttendance({...newAttendance, newcomers: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of newcomers..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Visitors
                  </label>
                  <input
                    type="number"
                    value={newAttendance.visitors}
                    onChange={(e) => setNewAttendance({...newAttendance, visitors: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Number of visitors..."
                  />
                </div>

                <div className="border-t pt-4">
                  <div className="text-sm text-gray-600 mb-2">
                    Total: {(parseInt(newAttendance.members) || 0) + (parseInt(newAttendance.newcomers) || 0) + (parseInt(newAttendance.visitors) || 0)}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Record Attendance
                  </button>
                </div>
              </form>

              {/* Recent Attendance */}
              <div className="mt-6 border-t pt-4">
                <h4 className="font-medium text-gray-900 mb-3">Recent Attendance</h4>
                <div className="space-y-2">
                  {attendanceRecords
                    .filter(record => record.programId === selectedProgram)
                    .slice(0, 3)
                    .map(record => (
                      <div key={record.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{record.date}</span>
                        <span className="font-medium">
                          {record.members + record.newcomers + record.visitors}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Select a program to record attendance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}