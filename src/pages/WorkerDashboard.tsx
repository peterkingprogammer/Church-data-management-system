import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../lib/supabase'
import { 
  CheckSquare, 
  Calendar, 
  Users, 
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  Plus,
  Eye,
  Upload
} from 'lucide-react'

interface WorkerStats {
  myTasks: number
  completedTasks: number
  todayAttendance: number
  myReports: number
  activePrograms: number
  pendingFollowUps: number
}

export default function WorkerDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState<WorkerStats>({
    myTasks: 0,
    completedTasks: 0,
    todayAttendance: 0,
    myReports: 0,
    activePrograms: 0,
    pendingFollowUps: 0
  })
  const [myTasks, setMyTasks] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]

      // Fetch worker-specific stats
      const [
        tasksResult,
        completedTasksResult,
        attendanceResult,
        reportsResult,
        programsResult,
        followUpsResult
      ] = await Promise.all([
        supabase.from('tasks').select('id', { count: 'exact' }).eq('assigned_to', user!.id).eq('is_completed', false),
        supabase.from('tasks').select('id', { count: 'exact' }).eq('assigned_to', user!.id).eq('is_completed', true),
        supabase.from('attendance').select('id', { count: 'exact' }).eq('date', today),
        supabase.from('department_reports').select('id', { count: 'exact' }).eq('submitted_by', user!.id),
        supabase.from('programs').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('follow_ups').select('id', { count: 'exact' }).eq('assigned_worker_id', user!.id).eq('status', 'pending')
      ])

      setStats({
        myTasks: tasksResult.count || 0,
        completedTasks: completedTasksResult.count || 0,
        todayAttendance: attendanceResult.count || 0,
        myReports: reportsResult.count || 0,
        activePrograms: programsResult.count || 0,
        pendingFollowUps: followUpsResult.count || 0
      })

      // Fetch my tasks with details
      const { data: tasks } = await supabase
        .from('tasks')
        .select(`
          id,
          task_text,
          due_date,
          priority,
          is_completed,
          created_at,
          assigned_by_user:users!tasks_assigned_by_fkey(full_name)
        `)
        .eq('assigned_to', user!.id)
        .order('created_at', { ascending: false })
        .limit(5)

      setMyTasks(tasks || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
    return `${greeting}, ${user?.full_name?.split(' ')[0]}!`
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const quickStats = [
    { name: 'My Tasks', value: stats.myTasks.toString(), icon: CheckSquare, color: 'blue' },
    { name: 'Completed Tasks', value: stats.completedTasks.toString(), icon: CheckCircle, color: 'green' },
    { name: 'Today\'s Attendance', value: stats.todayAttendance.toString(), icon: Users, color: 'purple' },
    { name: 'My Reports', value: stats.myReports.toString(), icon: FileText, color: 'orange' },
    { name: 'Active Programs', value: stats.activePrograms.toString(), icon: Calendar, color: 'indigo' },
    { name: 'Follow-ups', value: stats.pendingFollowUps.toString(), icon: Clock, color: 'yellow' }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      yellow: 'bg-yellow-100 text-yellow-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {getWelcomeMessage()}
        </h1>
        <p className="text-gray-600">
          Here's your work overview for today
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">My Tasks</h3>
              <CheckSquare className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {myTasks.map((task) => (
                <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{task.task_text}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>Assigned by: {task.assigned_by_user?.full_name}</span>
                    {task.due_date && (
                      <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                      Mark Complete
                    </button>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                      Add Comment
                    </button>
                  </div>
                </div>
              ))}
              {myTasks.length === 0 && (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-500">No pending tasks. Great job!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="font-medium text-blue-900">Record Attendance</span>
                <Users className="h-5 w-5 text-blue-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="font-medium text-green-900">Submit Report</span>
                <Upload className="h-5 w-5 text-green-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="font-medium text-purple-900">Manage Folders</span>
                <FileText className="h-5 w-5 text-purple-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <span className="font-medium text-orange-900">Follow-up Newcomers</span>
                <Eye className="h-5 w-5 text-orange-600" />
              </button>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Morning Prayer</p>
                  <p className="text-xs text-gray-500">8:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Sunday Service</p>
                  <p className="text-xs text-gray-500">10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Youth Meeting</p>
                  <p className="text-xs text-gray-500">6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Performance</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Task Completion</span>
                  <span>{stats.completedTasks > 0 ? Math.round((stats.completedTasks / (stats.completedTasks + stats.myTasks)) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${stats.completedTasks > 0 ? Math.round((stats.completedTasks / (stats.completedTasks + stats.myTasks)) * 100) : 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span>Reports Submitted</span>
                <span className="font-medium">{stats.myReports}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Follow-ups Pending</span>
                <span className="font-medium">{stats.pendingFollowUps}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}