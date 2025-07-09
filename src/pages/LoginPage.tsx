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
        return <Navigate to="/pastor/dashboard" />
      case 'worker':
        return <Navigate to="/worker/dashboard" />
      case 'member':
        return <Navigate to="/member/dashboard" />
      case 'newcomer':
        return <Navigate to="/newcomer/welcome" />
      default:
        return <Navigate to="/newcomer/welcome" />
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const { error } = await signIn(email, password)
    if (error) {
      setError(error.includes('Invalid') ? t('auth.error.invalid') : t('auth.error.network'))
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Church className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {t('app.title')}
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            {t('app.subtitle')}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {t('auth.signin_subtitle')}
          </p>
        </div>

        {/* Company Branding */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20 shadow-lg">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Church className="h-6 w-6 text-orange-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent">
              {t('company.name')}
            </span>
          </div>
          <p className="text-sm text-gray-600 italic mb-3">
            "{t('company.tagline')}"
          </p>
          <div className="border-t pt-3">
            <p className="text-xs text-gray-500 font-medium">
              {t('bible.verse')}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {t('bible.text')}
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-xl rounded-xl border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.email')}
              </label>
              <div className="relative">
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
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="pastor@church.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                {t('auth.password')}
              </label>
              <div className="relative">
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
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="text-red-600 text-sm text-center font-medium">
                  {error}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    {t('auth.loading')}
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    {t('auth.login')}
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

        {/* Demo Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Accounts:</h4>
          <div className="text-xs text-blue-700 space-y-1">
            <div><strong>Pastor:</strong> pastor@church.com / password</div>
            <div><strong>Worker:</strong> worker@church.com / password</div>
            <div><strong>Member:</strong> member@church.com / password</div>
            <div><strong>Newcomer:</strong> newcomer@church.com / password</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            {t('footer.copyright')}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {t('footer.verse')} - {t('bible.text')}
          </p>
        </div>
      </div>
    </div>
  )
}