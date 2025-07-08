import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, Users, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  
  const events = [
    {
      id: 1,
      title: 'Sunday Morning Service',
      date: '2024-01-21',
      time: '10:00 AM',
      type: 'service',
      location: 'Main Sanctuary',
      attendees: 150
    },
    {
      id: 2,
      title: 'Bible Study',
      date: '2024-01-24',
      time: '7:00 PM',
      type: 'study',
      location: 'Fellowship Hall',
      attendees: 45
    },
    {
      id: 3,
      title: 'Youth Meeting',
      date: '2024-01-26',
      time: '6:00 PM',
      type: 'youth',
      location: 'Youth Room',
      attendees: 25
    },
    {
      id: 4,
      title: 'Prayer Meeting',
      date: '2024-01-27',
      time: '8:00 AM',
      type: 'prayer',
      location: 'Prayer Room',
      attendees: 20
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'service': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'study': return 'bg-green-100 text-green-800 border-green-200';
      case 'youth': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'prayer': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateStr);
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-600">Schedule and manage church events</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === 'month' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                view === 'week' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
              }`}
            >
              Week
            </button>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {formatMonthYear(currentDate)}
              </h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {/* Week day headers */}
              {weekDays.map(day => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {days.map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-100 ${
                    day ? 'bg-white hover:bg-gray-50' : 'bg-gray-50'
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                      <div className="space-y-1">
                        {getEventsForDate(day).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded border ${getEventColor(event.type)}`}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="opacity-75">{event.time}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {events.slice(0, 4).map(event => (
                <div key={event.id} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">{event.title}</h4>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-1" />
                    {event.attendees} expected
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Categories */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                <span className="text-sm text-gray-700">Services</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                <span className="text-sm text-gray-700">Bible Studies</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                <span className="text-sm text-gray-700">Youth Events</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-3"></div>
                <span className="text-sm text-gray-700">Prayer Meetings</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}