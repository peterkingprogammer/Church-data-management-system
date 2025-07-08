import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { 
  Church,
  LayoutDashboard,
  FolderOpen,
  FileText,
  Calendar,
  CheckSquare,
  Users,
  UserCheck,
  Heart,
  UserPlus,
  FileBarChart,
  Bell,
  UserX,
  Shield,
  History,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Globe
} from 'lucide-react'
import LanguageSelector from './LanguageSelector'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth()
  const { t } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const getNavigationItems = () => {
    if (!user) return []

    const baseItems = [
      { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard }
    ]

    switch (user.role) {
      case 'pastor':
        return [
          ...baseItems,
          { name: t('nav.folders'), href: '/folders', icon: FolderOpen },
          { name: t('nav.pd_summary'), href: '/pd-summary', icon: FileText },
          { name: t('nav.calendar'), href: '/calendar', icon: Calendar },
          { name: t('nav.tasks'), href: '/tasks', icon: CheckSquare },
          { name: t('nav.programs'), href: '/programs', icon: Users },
          { name: t('nav.attendance'), href: '/attendance', icon: UserCheck },
          { name: t('nav.souls_won'), href: '/souls-won', icon: Heart },
          { name: t('nav.follow_ups'), href: '/follow-ups', icon: UserPlus },
          { name: t('nav.department_reports'), href: '/department-reports', icon: FileBarChart },
          { name: t('nav.notices'), href: '/notices', icon: Bell },
          { name: t('nav.excuses'), href: '/excuses', icon: UserX },
          { name: t('nav.permissions'), href: '/permissions', icon: Shield },
          { name: t('nav.history'), href: '/history', icon: History },
          { name: t('nav.profile'), href: '/profile', icon: User },
          { name: t('nav.settings'), href: '/settings', icon: Settings }
        ]

      case 'worker':
        return [
          ...baseItems,
          { name: t('nav.folders'), href: '/folders', icon: FolderOpen },
          { name: t('nav.pd_summary'), href: '/pd-summary', icon: FileText },
          { name: t('nav.calendar'), href: '/calendar', icon: Calendar },
          { name: t('nav.tasks'), href: '/tasks', icon: CheckSquare },
          { name: t('nav.programs'), href: '/programs', icon: Users },
          { name: t('nav.attendance'), href: '/attendance', icon: UserCheck },
          { name: t('nav.souls_won'), href: '/souls-won', icon: Heart },
          { name: t('nav.follow_ups'), href: '/follow-ups', icon: UserPlus },
          { name: t('nav.department_reports'), href: '/department-reports', icon: FileBarChart },
          { name: t('nav.notices'), href: '/notices', icon: Bell },
          { name: t('nav.profile'), href: '/profile', icon: User }
        ]

      case 'member':
        return [
          ...baseItems,
          { name: t('nav.events'), href: '/events', icon: Calendar },
          { name: t('nav.programs'), href: '/programs', icon: Users },
          { name: t('nav.notices'), href: '/notices', icon: Bell },
          { name: t('nav.my_excuses'), href: '/my-excuses', icon: UserX },
          { name: t('nav.profile'), href: '/profile', icon: User }
        ]

      case 'newcomer':
        return [
          ...baseItems,
          { name: t('nav.my_information'), href: '/my-information', icon: User }
        ]

      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems()

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center">
              <Church className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-lg font-semibold text-gray-900">
                {import.meta.env.VITE_COMPANY_NAME || 'AMEN TECH'}
              </span>
            </div>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6 text-gray-400" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              {t('logout')}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex items-center h-16 px-4 border-b">
            <Church className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              {import.meta.env.VITE_COMPANY_NAME || 'AMEN TECH'}
            </span>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user?.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.full_name}</p>
                <p className="text-xs text-gray-500 capitalize">{t(`role.${user?.role}`)}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              {t('logout')}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6 text-gray-400" />
          </button>
          <div className="flex items-center">
            <Church className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">
              {import.meta.env.VITE_COMPANY_NAME || 'AMEN TECH'}
            </span>
          </div>
          <LanguageSelector />
        </div>

        {/* Desktop header */}
        <div className="hidden lg:flex items-center justify-between h-16 px-6 bg-white border-b">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Add Church Name Here
            </h1>
            <p className="text-sm text-gray-500">Add Church Address Here</p>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-gray-400" />
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-600">
                    {user?.full_name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">{user?.full_name}</p>
                  <p className="text-xs text-gray-500 capitalize">{t(`role.${user?.role}`)}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                {t('logout')}
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Church className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-900">
                {import.meta.env.VITE_COMPANY_NAME || 'AMEN TECH'}
              </span>
              <span className="text-sm text-gray-500">
                {import.meta.env.VITE_COMPANY_TAGLINE || 'Building systems that serves God\'s kingdom'}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {t('footer.verse_reference')} • {t('footer.copyright')}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}