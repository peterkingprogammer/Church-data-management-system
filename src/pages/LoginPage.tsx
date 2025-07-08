import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useLanguage } from '../contexts/LanguageContext'
import { Church, Mail, Lock, LogIn, Loader2 } from 'lucide-react'
import LanguageSelector from '../components/LanguageSelector'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { user, signIn } = useAuth()
  const { t } = useLanguage()

  if (user) {
    // Redirect based on role
    switch (user.role) {
      case 'pastor':
        return <Navigate to="/dashboard" />
      case 'worker':
        return <Navigate to="/dashboard" />
      case 'member':
        return <Navigate to="/dashboard" />
      case 'newcomer':
        return <Navigate to="/dashboard" />
      default:
        return <Navigate to="/dashboard" />
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const { error } = await signIn(email, password)
    if (error) {
      setError(t('message.login_error'))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <Church className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {t('app.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {t('login')} to your church account
          </p>
        </div>

        {/* Company Branding */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Church className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              {import.meta.env.VITE_COMPANY_NAME || 'AMEN TECH'}
            </span>
          </div>
          <p className="text-sm text-gray-600 italic mb-2">
            "{import.meta.env.VITE_COMPANY_TAGLINE || 'Building systems that serves God\'s kingdom'}"
          </p>
          <p className="text-xs text-gray-500">
            {import.meta.env.VITE_BIBLE_VERSE || 'Matthew 6:33'}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {t('email')}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {t('password')}
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    {t('login')}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Language Selector */}
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}