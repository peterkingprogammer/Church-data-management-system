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
  FileBarChart
} from 'lucide-react'

interface DashboardStats {
  todayAttendance: number
  weeklyAttendance: number
  pendingTasks: number
  activeNotices: number
  soulsWon: number
  newVisitors: number
  activePrograms: number
  myAttendance: number
  myExcuses: number
  churchNotices: number
}

export default function Dashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState<DashboardStats>({
    todayAttendance: 0,
    weeklyAttendance: 0,
    pendingTasks: 0,
    activeNotices: 0,
    soulsWon: 0,
    newVisitors: 0,
    activePrograms: 0,
    myAttendance: 0,
    myExcuses: 0,
    churchNotices: 0
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      // Fetch stats based on user role
      const today = new Date().toISOString().split('T')[0]
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - 7)

      // Common queries
      const [attendanceToday, attendanceWeek, tasks, notices] = await Promise.all([
        supabase.from('attendance').select('*').eq('date', today),
        supabase.from('attendance').select('*').gte('date', weekStart.toISOString().split('T')[0]),
        supabase.from('tasks').select('*').eq('is_completed', false),
        supabase.from('notices').select('*').eq('status', 'active')
      ])

      const newStats: DashboardStats = {
        todayAttendance: attendanceToday.data?.length || 0,
        weeklyAttendance: attendanceWeek.data?.length || 0,
        pendingTasks: tasks.data?.length || 0,
        activeNotices: notices.data?.length || 0,
        soulsWon: 0,
        newVisitors: 0,
        activePrograms: 0,
        myAttendance: 0,
        myExcuses: 0,
        churchNotices: notices.data?.length || 0
      }

      // Role-specific data
      if (user?.role === 'pastor' || user?.role === 'worker') {
        const [souls, visitors, programs] = await Promise.all([
          supabase.from('souls_won').select('*'),
          supabase.from('follow_ups').select('*').eq('status', 'pending'),
          supabase.from('programs').select('*').eq('status', 'active')
        ])

        newStats.soulsWon = souls.data?.length || 0
        newStats.newVisitors = visitors.data?.length || 0
        newStats.activePrograms = programs.data?.length || 0
      }

      if (user?.role === 'member') {
        const [myAttendance, myExcuses] = await Promise.all([
          supabase.from('attendance').select('*').eq('user_id', user.id),
          supabase.from('excuses').select('*').eq('user_id', user.id)
        ])

        newStats.myAttendance = myAttendance.data?.length || 0
        newStats.myExcuses = myExcuses.data?.length || 0
      }

      setStats(newStats)

      // Fetch recent activity (simplified)
      setRecentActivity([
        { action: 'John Doe marked attendance', time: '2 hours ago', type: 'attendance' },
        { action: 'Pastor John sent church notice', time: '3 hours ago', type: 'notice' },
        { action: 'Mary Johnson submitted excuse', time: '4 hours ago', type: 'excuse' },
        { action: 'David Wilson completed task', time: '1 day ago', type: 'task' }
      ])

      // Fetch upcoming events (simplified)
      setUpcomingEvents([
        { name: 'Sunday Morning Service', date: 'Tomorrow', time: '10:00 AM', type: 'service' },
        { name: 'Bible Study', date: 'Wednesday', time: '7:00 PM', type: 'study' },
        { name: 'Youth Meeting', date: 'Friday', time: '6:00 PM', type: 'youth' },
        { name: 'Prayer Meeting', date: 'Saturday', time: '8:00 AM', type: 'prayer' }
      ])

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
    
    switch (user?.role) {
      case 'pastor':
        return `${greeting}, Pastor ${user.full_name?.split(' ')[0]}!`
      case 'worker':
        return `${greeting}, ${user.full_name?.split(' ')[0]}!`
      case 'member':
        return `${greeting}, ${user.full_name?.split(' ')[0]}!`
      case 'newcomer':
        return `Welcome to our church, ${user.full_name?.split(' ')[0]}!`
      default:
        return `${greeting}, ${user?.full_name?.split(' ')[0]}!`
    }
  }

  const getQuickStats = () => {
    if (user?.role === 'pastor' || user?.role === 'worker') {
      return [
        { name: t('dashboard.today_attendance'), value: stats.todayAttendance.toString(), icon: Users, change: '+5%', changeType: 'increase' },
        { name: t('dashboard.weekly_attendance'), value: stats.weeklyAttendance.toString(), icon: Calendar, change: '+12%', changeType: 'increase' },
        { name: t('dashboard.pending_tasks'), value: stats.pendingTasks.toString(), icon: CheckSquare, change: '-2', changeType: 'decrease' },
        { name: t('dashboard.active_notices'), value: stats.activeNotices.toString(), icon: Bell, change: '+1', changeType: 'increase' }
      ]
    }

    if (user?.role === 'member') {
      return [
        { name: 'My Attendance', value: stats.myAttendance.toString(), icon: UserCheck, change: '+2', changeType: 'increase' },
        { name: 'This Month', value: '4', icon: Calendar, change: 'Times attended', changeType: 'neutral' },
        { name: t('dashboard.church_notices'), value: stats.churchNotices.toString(), icon: Bell, change: 'Active notices', changeType: 'neutral' },
        { name: 'My Excuses', value: stats.myExcuses.toString(), icon: UserPlus, change: 'Submitted excuses', changeType: 'neutral' }
      ]
    }

    if (user?.role === 'newcomer') {
      return [
        { name: 'Welcome!', value: '👋', icon: Heart, change: 'Complete your profile', changeType: 'neutral' },
        { name: 'Programs', value: '3', icon: BookOpen, change: 'Available events', changeType: 'neutral' }
      ]
    }

    return []
  }

  const quickStats = getQuickStats()

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
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

      {/* Role-specific welcome message for newcomers */}
      {user?.role === 'newcomer' && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <UserPlus className="h-8 w-8 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-blue-900">
              Welcome to our church family!
            </h2>
          </div>
          <p className="text-blue-800 mb-4">
            We're so glad you're here. Please take a moment to complete your information 
            so we can better serve you and help you get connected.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            {t('action.complete_profile')}
          </button>
        </div>
      )}

      {/* Quick Stats */}
      {quickStats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
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
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.upcoming_events')}</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{event.name}</p>
                  <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">{event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity or Quick Actions */}
        {(user?.role === 'pastor' || user?.role === 'worker') ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.recent_activity')}</h3>
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {activity.type === 'attendance' && <UserCheck className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'notice' && <Bell className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'excuse' && <UserPlus className="h-4 w-4 text-blue-600" />}
                      {activity.type === 'task' && <CheckSquare className="h-4 w-4 text-blue-600" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.quick_actions')}</h3>
              <Target className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {user?.role === 'member' && (
                <>
                  <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    <span className="font-medium text-blue-900">{t('action.mark_attendance')}</span>
                    <CheckSquare className="h-5 w-5 text-blue-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="font-medium text-green-900">{t('action.view_notices')}</span>
                    <Bell className="h-5 w-5 text-green-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                    <span className="font-medium text-purple-900">{t('action.submit_excuse')}</span>
                    <UserPlus className="h-5 w-5 text-purple-600" />
                  </button>
                </>
              )}
              {user?.role === 'newcomer' && (
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <span className="font-medium text-blue-900">{t('action.complete_profile')}</span>
                  <Users className="h-5 w-5 text-blue-600" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Personal Stats for Members */}
      {user?.role === 'member' && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Award className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">85%</p>
            <p className="text-sm text-gray-600">Attendance Rate</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Services Attended</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
            <BookOpen className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Programs Joined</p>
          </div>
        </div>
      )}

      {/* Church Information */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.church_information')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Address</h4>
            <p className="text-gray-600">Add Church Address Here</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Contact</h4>
            <p className="text-gray-600">Add Church phone Here</p>
            <p className="text-gray-600">Add Church Email Here</p>
          </div>
        </div>
      </div>
    </div>
  )
}