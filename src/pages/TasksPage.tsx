import React, { useState } from 'react';
import { CheckSquare, Plus, Clock, User, AlertCircle, CheckCircle } from 'lucide-react';

export default function TasksPage() {
  const [tasks] = useState([
    {
      id: 1,
      title: 'Prepare Sunday service materials',
      description: 'Gather all materials needed for Sunday morning service including bulletins and communion supplies',
      assignedTo: 'Mary Johnson',
      assignedBy: 'Pastor John Smith',
      dueDate: '2024-01-21',
      priority: 'high',
      status: 'pending',
      createdAt: '2024-01-18'
    },
    {
      id: 2,
      title: 'Update church website',
      description: 'Add new upcoming events and update the calendar section',
      assignedTo: 'David Wilson',
      assignedBy: 'Pastor John Smith',
      dueDate: '2024-01-25',
      priority: 'medium',
      status: 'in-progress',
      createdAt: '2024-01-17'
    },
    {
      id: 3,
      title: 'Organize youth room',
      description: 'Clean and reorganize the youth room for Friday meeting',
      assignedTo: 'Sarah Brown',
      assignedBy: 'Mary Johnson',
      dueDate: '2024-01-26',
      priority: 'low',
      status: 'completed',
      createdAt: '2024-01-16'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    assignedTo: '',
    dueDate: '',
    priority: 'medium'
  });

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in-progress': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add task logic here
    setNewTask({
      title: '',
      description: '',
      assignedTo: '',
      dueDate: '',
      priority: 'medium'
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-600">Assign and track task completion</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Assign Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Task Creation Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Task</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Task description..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select person...</option>
                <option value="Mary Johnson">Mary Johnson</option>
                <option value="David Wilson">David Wilson</option>
                <option value="Sarah Brown">Sarah Brown</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Create Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div className="lg:col-span-3">
          {/* Filter Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            {['all', 'pending', 'in-progress', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status as any)}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors capitalize ${
                  filter === status
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {status === 'all' ? 'All Tasks' : status.replace('-', ' ')}
              </button>
            ))}
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
                </div>
                <CheckSquare className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {tasks.filter(t => t.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {tasks.filter(t => t.status === 'in-progress').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-green-600">
                    {tasks.filter(t => t.status === 'completed').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="space-y-4">
            {filteredTasks.map((task) => (
              <div key={task.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 mr-3">{task.title}</h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                        {getStatusIcon(task.status)}
                        <span className="ml-1 capitalize">{task.status.replace('-', ' ')}</span>
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Assigned to: {task.assignedTo}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Due: {task.dueDate}
                      </div>
                      <div className={`flex items-center font-medium ${getPriorityColor(task.priority)}`}>
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {task.priority} priority
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {task.status !== 'completed' && (
                      <>
                        <button className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                          Update Status
                        </button>
                        <button className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                          Mark Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500">
                    Assigned by {task.assignedBy} on {task.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}