import React, { useState } from 'react';
import { History, Filter, Download, Search, Calendar, User, FileText, MessageCircle } from 'lucide-react';

export default function HistoryPage() {
  const [historyEntries] = useState([
    {
      id: 1,
      type: 'pd_note',
      title: 'Weekly Directive - Youth Focus',
      content: 'This week, let\'s put special emphasis on youth engagement...',
      author: 'Pastor John Smith',
      date: '2024-01-20',
      category: 'Pastor Directive'
    },
    {
      id: 2,
      type: 'task_feedback',
      title: 'Sunday Service Setup - Completed',
      content: 'All materials prepared successfully. Communion supplies ready...',
      author: 'Mary Johnson',
      date: '2024-01-21',
      category: 'Task Completion'
    },
    {
      id: 3,
      type: 'comment',
      title: 'Foundation Programs - Service Note',
      content: 'Great discussion during today\'s foundation class...',
      author: 'David Wilson',
      date: '2024-01-19',
      category: 'Folder Comment'
    },
    {
      id: 4,
      type: 'meeting_note',
      title: 'Leadership Meeting Summary',
      content: 'Discussed upcoming events and ministry assignments...',
      author: 'Pastor John Smith',
      date: '2024-01-18',
      category: 'Meeting Notes'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pd_note' | 'task_feedback' | 'comment' | 'meeting_note'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const filteredEntries = historyEntries.filter(entry => {
    const matchesFilter = filter === 'all' || entry.type === filter;
    const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = (!dateRange.start || entry.date >= dateRange.start) &&
                            (!dateRange.end || entry.date <= dateRange.end);
    
    return matchesFilter && matchesSearch && matchesDateRange;
  });

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'pd_note': return <FileText className="h-5 w-5 text-purple-600" />;
      case 'task_feedback': return <MessageCircle className="h-5 w-5 text-blue-600" />;
      case 'comment': return <MessageCircle className="h-5 w-5 text-green-600" />;
      case 'meeting_note': return <Calendar className="h-5 w-5 text-orange-600" />;
      default: return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };

  const getEntryColor = (type: string) => {
    switch (type) {
      case 'pd_note': return 'border-l-purple-500 bg-purple-50';
      case 'task_feedback': return 'border-l-blue-500 bg-blue-50';
      case 'comment': return 'border-l-green-500 bg-green-50';
      case 'meeting_note': return 'border-l-orange-500 bg-orange-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const handleExport = () => {
    // Export logic here
    console.log('Exporting history data...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">History & Feedback</h1>
          <p className="text-gray-600">Complete audit trail and feedback system</p>
        </div>
        <button 
          onClick={handleExport}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center"
        >
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search entries..."
            />
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="pd_note">PD Notes</option>
              <option value="task_feedback">Task Feedback</option>
              <option value="comment">Comments</option>
              <option value="meeting_note">Meeting Notes</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Start date"
            />
          </div>
          <div>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="End date"
            />
          </div>
        </div>

        {/* Filter Summary */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Showing {filteredEntries.length} of {historyEntries.length} entries</span>
            {(searchTerm || filter !== 'all' || dateRange.start || dateRange.end) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                  setDateRange({ start: '', end: '' });
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Clear filters
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Filters active</span>
          </div>
        </div>
      </div>

      {/* History Entries */}
      <div className="space-y-4">
        {filteredEntries.map((entry) => (
          <div key={entry.id} className={`bg-white rounded-lg shadow-sm border-l-4 p-6 ${getEntryColor(entry.type)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="mr-3">
                  {getEntryIcon(entry.type)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                  <span className="text-sm text-gray-600 bg-white px-2 py-1 rounded-full border">
                    {entry.category}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center text-sm text-gray-500 mb-1">
                  <Calendar className="h-4 w-4 mr-1" />
                  {entry.date}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <User className="h-4 w-4 mr-1" />
                  {entry.author}
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">{entry.content}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Type: {entry.type.replace('_', ' ')}</span>
                <span>•</span>
                <span>Author: {entry.author}</span>
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                  View Details
                </button>
                <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                  Export
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <History className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
          <p className="text-gray-600">
            {searchTerm || filter !== 'all' || dateRange.start || dateRange.end
              ? 'Try adjusting your filters to see more results.'
              : 'History entries will appear here as activities are recorded.'}
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900">{historyEntries.length}</p>
            </div>
            <History className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">PD Notes</p>
              <p className="text-2xl font-bold text-purple-600">
                {historyEntries.filter(e => e.type === 'pd_note').length}
              </p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Task Feedback</p>
              <p className="text-2xl font-bold text-blue-600">
                {historyEntries.filter(e => e.type === 'task_feedback').length}
              </p>
            </div>
            <MessageCircle className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Comments</p>
              <p className="text-2xl font-bold text-green-600">
                {historyEntries.filter(e => e.type === 'comment').length}
              </p>
            </div>
            <MessageCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}