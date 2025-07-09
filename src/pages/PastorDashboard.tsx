import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../lib/supabase'
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
  Target,
  Bell,
  UserCheck,
  FileBarChart,
  Settings,
  Plus,
  Eye
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  todayAttendance: number
  weeklyAttendance: number
  pendingTasks: number
  completedTasks: number
  activeNotices: number
  soulsWon: number
  newVisitors: number
  activePrograms: number
  pendingExcuses: number
}

export default function PastorDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    todayAttendance: 0,
    weeklyAttendance: 0,
    pendingTasks: 0,
    completedTasks: 0,
    activeNotices: 0,
    soulsWon: 0,
    newVisitors: 0,
    activePrograms: 0,
    pendingExcuses: 0
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - 7)

      // Fetch all stats in parallel
      const [
        usersResult,
        attendanceTodayResult,
        attendanceWeekResult,
        tasksResult,
        completedTasksResult,
        noticesResult,
        soulsResult,
        followUpsResult,
        programsResult,
        excusesResult
      ] = await Promise.all([
        supabase.from('users').select('id', { count: 'exact' }),
        supabase.from('attendance').select('id', { count: 'exact' }).eq('date', today),
        supabase.from('attendance').select('id', { count: 'exact' }).gte('date', weekStart.toISOString().split('T')[0]),
        supabase.from('tasks').select('id', { count: 'exact' }).eq('is_completed', false),
        supabase.from('tasks').select('id', { count: 'exact' }).eq('is_completed', true),
        supabase.from('notices').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('souls_won').select('id', { count: 'exact' }),
        supabase.from('follow_ups').select('id', { count: 'exact' }).eq('status', 'pending'),
        supabase.from('programs').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('excuses').select('id', { count: 'exact' }).eq('status', 'pending')
      ])

      setStats({
        totalUsers: usersResult.count || 0,
        todayAttendance: attendanceTodayResult.count || 0,
        weeklyAttendance: attendanceWeekResult.count || 0,
        pendingTasks: tasksResult.count || 0,
        completedTasks: completedTasksResult.count || 0,
        activeNotices: noticesResult.count || 0,
        soulsWon: soulsResult.count || 0,
        newVisitors: followUpsResult.count || 0,
        activePrograms: programsResult.count || 0,
        pendingExcuses: excusesResult.count || 0
      })

      // Fetch recent activity
      const { data: activities } = await supabase
        .from('tasks')
        .select(`
          id,
          task_text,
          is_completed,
          created_at,
          assigned_to_user:users!tasks_assigned_to_fkey(full_name)
        `)
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentActivity(activities || [])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
    return `${greeting}, Pastor ${user?.full_name?.split(' ')[0]}!`
  }

  const quickStats = [
    { name: 'Total Users', value: stats.totalUsers.toString(), icon: Users, change: '+12%', changeType: 'increase', color: 'blue' },
    { name: t('dashboard.stats.attendance'), value: stats.todayAttendance.toString(), icon: UserCheck, change: '+5%', changeType: 'increase', color: 'green' },
    { name: t('dashboard.stats.tasks'), value: stats.pendingTasks.toString(), icon: CheckSquare, change: '-2', changeType: 'decrease', color: 'yellow' },
    { name: t('dashboard.stats.notices'), value: stats.activeNotices.toString(), icon: Bell, change: '+1', changeType: 'increase', color: 'purple' },
    { name: t('dashboard.stats.souls'), value: stats.soulsWon.toString(), icon: Heart, change: '+3', changeType: 'increase', color: 'red' },
    { name: t('dashboard.stats.newcomers'), value: stats.newVisitors.toString(), icon: UserPlus, change: '+2', changeType: 'increase', color: 'indigo' },
    { name: t('dashboard.stats.programs'), value: stats.activePrograms.toString(), icon: BookOpen, change: 'Active', changeType: 'neutral', color: 'orange' },
    { name: 'Pending Excuses', value: stats.pendingExcuses.toString(), icon: Clock, change: 'Need review', changeType: 'neutral', color: 'gray' }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600',
      red: 'bg-red-100 text-red-600',
      indigo: 'bg-indigo-100 text-indigo-600',
      orange: 'bg-orange-100 text-orange-600',
      gray: 'bg-gray-100 text-gray-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
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
          {t('dashboard.overview')}
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

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">{stat.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      activity.is_completed ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      {activity.is_completed ? (
                        <CheckSquare className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.is_completed ? 'Task completed' : 'Task assigned'}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {activity.task_text}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.assigned_to_user?.full_name} • {new Date(activity.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-gray-500 text-center py-4">No recent activity</p>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="font-medium text-blue-900">Assign New Task</span>
                <Plus className="h-5 w-5 text-blue-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="font-medium text-green-900">Create Notice</span>
                <Bell className="h-5 w-5 text-green-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="font-medium text-purple-900">View Reports</span>
                <FileBarChart className="h-5 w-5 text-purple-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <span className="font-medium text-orange-900">Manage Users</span>
                <Users className="h-5 w-5 text-orange-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="font-medium text-gray-900">Church Settings</span>
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Church Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Church Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Members</span>
                <span className="font-semibold">{stats.totalUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">This Week's Attendance</span>
                <span className="font-semibold">{stats.weeklyAttendance}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Programs</span>
                <span className="font-semibold">{stats.activePrograms}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Souls Won</span>
                <span className="font-semibold text-green-600">{stats.soulsWon}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">
            {stats.completedTasks > 0 ? Math.round((stats.completedTasks / (stats.completedTasks + stats.pendingTasks)) * 100) : 0}%
          </p>
          <p className="text-sm text-gray-600">Task Completion Rate</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.weeklyAttendance}</p>
          <p className="text-sm text-gray-600">Weekly Attendance</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900">{stats.soulsWon}</p>
          <p className="text-sm text-gray-600">Total Souls Won</p>
        </div>
      </div>
    </div>
  )
}