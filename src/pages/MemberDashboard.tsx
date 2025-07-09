import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { supabase } from '../lib/supabase'
import { 
  Calendar, 
  Users, 
  Bell,
  User,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  UserCheck,
  FileText
} from 'lucide-react'

interface MemberStats {
  myAttendance: number
  thisMonthAttendance: number
  churchNotices: number
  myExcuses: number
  availablePrograms: number
}

export default function MemberDashboard() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [stats, setStats] = useState<MemberStats>({
    myAttendance: 0,
    thisMonthAttendance: 0,
    churchNotices: 0,
    myExcuses: 0,
    availablePrograms: 0
  })
  const [recentAttendance, setRecentAttendance] = useState<any[]>([])
  const [notices, setNotices] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchDashboardData()
    }
  }, [user])

  const fetchDashboardData = async () => {
    try {
      const thisMonth = new Date()
      thisMonth.setDate(1)
      const thisMonthStr = thisMonth.toISOString().split('T')[0]

      // Fetch member-specific stats
      const [
        attendanceResult,
        monthAttendanceResult,
        noticesResult,
        excusesResult,
        programsResult
      ] = await Promise.all([
        supabase.from('attendance').select('id', { count: 'exact' }).eq('user_id', user!.id),
        supabase.from('attendance').select('id', { count: 'exact' }).eq('user_id', user!.id).gte('date', thisMonthStr),
        supabase.from('notices').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('excuses').select('id', { count: 'exact' }).eq('user_id', user!.id),
        supabase.from('programs').select('id', { count: 'exact' }).eq('status', 'active')
      ])

      setStats({
        myAttendance: attendanceResult.count || 0,
        thisMonthAttendance: monthAttendanceResult.count || 0,
        churchNotices: noticesResult.count || 0,
        myExcuses: excusesResult.count || 0,
        availablePrograms: programsResult.count || 0
      })

      // Fetch recent attendance
      const { data: attendance } = await supabase
        .from('attendance')
        .select('*')
        .eq('user_id', user!.id)
        .order('date', { ascending: false })
        .limit(5)

      setRecentAttendance(attendance || [])

      // Fetch active notices
      const { data: activeNotices } = await supabase
        .from('notices')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(3)

      setNotices(activeNotices || [])

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

  const quickStats = [
    { name: 'My Attendance', value: stats.myAttendance.toString(), icon: UserCheck, change: '+2', changeType: 'increase', color: 'blue' },
    { name: 'This Month', value: stats.thisMonthAttendance.toString(), icon: Calendar, change: 'Times attended', changeType: 'neutral', color: 'green' },
    { name: 'Church Notices', value: stats.churchNotices.toString(), icon: Bell, change: 'Active notices', changeType: 'neutral', color: 'purple' },
    { name: 'My Excuses', value: stats.myExcuses.toString(), icon: FileText, change: 'Submitted excuses', changeType: 'neutral', color: 'orange' },
    { name: 'Programs', value: stats.availablePrograms.toString(), icon: BookOpen, change: 'Available events', changeType: 'neutral', color: 'indigo' }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      indigo: 'bg-indigo-100 text-indigo-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
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
          Welcome to your personal church dashboard
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
              <div className="mt-4 flex items-center">
                <span className="text-sm text-gray-600">{stat.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Attendance */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">My Recent Attendance</h3>
              <UserCheck className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentAttendance.map((attendance) => (
                <div key={attendance.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`h-3 w-3 rounded-full ${
                      attendance.status === 'present' ? 'bg-green-500' : 
                      attendance.status === 'excused' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(attendance.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-sm text-gray-500 capitalize">{attendance.status}</p>
                    </div>
                  </div>
                  {attendance.time_in && (
                    <span className="text-sm text-gray-500">{attendance.time_in}</span>
                  )}
                </div>
              ))}
              {recentAttendance.length === 0 && (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No attendance records yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <span className="font-medium text-blue-900">Mark Attendance</span>
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <span className="font-medium text-green-900">View Notices</span>
                <Bell className="h-5 w-5 text-green-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <span className="font-medium text-purple-900">Submit Excuse</span>
                <FileText className="h-5 w-5 text-purple-600" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors">
                <span className="font-medium text-orange-900">Update Profile</span>
                <User className="h-5 w-5 text-orange-600" />
              </button>
            </div>
          </div>

          {/* Church Notices */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Church Notices</h3>
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium text-gray-900">{notice.title}</h4>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notice.content}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(notice.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))}
              {notices.length === 0 && (
                <p className="text-gray-500 text-center py-4">No active notices</p>
              )}
            </div>
          </div>

          {/* My Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">My Statistics</h3>
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">
                  {stats.thisMonthAttendance > 0 ? Math.round((stats.thisMonthAttendance / new Date().getDate()) * 100) : 0}%
                </p>
                <p className="text-sm text-blue-700">Attendance Rate</p>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total Services Attended</span>
                <span className="font-medium">{stats.myAttendance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>This Month</span>
                <span className="font-medium">{stats.thisMonthAttendance}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Excuses Submitted</span>
                <span className="font-medium">{stats.myExcuses}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}