import React, { useState } from 'react';
import { FileText, Plus, Send, Calendar, User } from 'lucide-react';

export default function PDSummaryPage() {
  const [summaries] = useState([
    {
      id: 1,
      title: 'Sunday Morning Service Summary',
      content: 'Great service today with 89 attendees. The worship was powerful and 3 souls were won during altar call.',
      author: 'Mary Johnson',
      role: 'Worker',
      date: '2024-01-21',
      type: 'Service Report'
    },
    {
      id: 2,
      title: 'Weekly Directive - Focus on Youth',
      content: 'This week, let\'s put special emphasis on youth engagement. Please ensure all youth programs are well-prepared.',
      author: 'Pastor John Smith',
      role: 'Pastor',
      date: '2024-01-20',
      type: 'Pastor Directive'
    },
    {
      id: 3,
      title: 'Bible Study Attendance Report',
      content: 'Wednesday Bible study had 45 attendees. Great discussion on Romans chapter 8. Need more chairs for next week.',
      author: 'David Wilson',
      role: 'Worker',
      date: '2024-01-19',
      type: 'Service Report'
    }
  ]);

  const [newSummary, setNewSummary] = useState({
    title: '',
    content: '',
    type: 'Service Report',
    targetAudience: 'All Staff'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add summary logic here
    setNewSummary({
      title: '',
      content: '',
      type: 'Service Report',
      targetAudience: 'All Staff'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">PD Summary</h1>
          <p className="text-gray-600">Pastor's Desk summaries and service directives</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New Summary
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create New Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Summary</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newSummary.title}
                  onChange={(e) => setNewSummary({...newSummary, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Summary title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={newSummary.type}
                  onChange={(e) => setNewSummary({...newSummary, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Service Report</option>
                  <option>Pastor Directive</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Audience
                </label>
                <select
                  value={newSummary.targetAudience}
                  onChange={(e) => setNewSummary({...newSummary, targetAudience: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>All Staff</option>
                  <option>Workers Only</option>
                  <option>Leadership Team</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  value={newSummary.content}
                  onChange={(e) => setNewSummary({...newSummary, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Enter summary content..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
              >
                <Send className="h-4 w-4 mr-2" />
                Submit Summary
              </button>
            </form>
          </div>
        </div>

        {/* Summaries List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {summaries.map((summary) => (
              <div key={summary.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${
                      summary.type === 'Pastor Directive' ? 'bg-purple-100' : 'bg-blue-100'
                    }`}>
                      <FileText className={`h-5 w-5 ${
                        summary.type === 'Pastor Directive' ? 'text-purple-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{summary.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        summary.type === 'Pastor Directive' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {summary.type}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Calendar className="h-4 w-4 mr-1" />
                      {summary.date}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1" />
                      {summary.author}
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{summary.content}</p>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      By {summary.author} ({summary.role})
                    </span>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}