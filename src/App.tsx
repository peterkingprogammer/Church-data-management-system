import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { LanguageProvider } from './contexts/LanguageContext'
import LoginPage from './pages/LoginPage'
import PastorDashboard from './pages/PastorDashboard'
import WorkerDashboard from './pages/WorkerDashboard'
import MemberDashboard from './pages/MemberDashboard'
import NewcomerWelcome from './pages/NewcomerWelcome'
import Layout from './components/Layout'
import './index.css'

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles: string[] }) {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" />
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
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
        return <Navigate to="/login" />
    }
  }
  
  return <>{children}</>
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      {/* Pastor Routes */}
      <Route 
        path="/pastor/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['pastor']}>
            <Layout>
              <PastorDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Worker Routes */}
      <Route 
        path="/worker/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <Layout>
              <WorkerDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Member Routes */}
      <Route 
        path="/member/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['member']}>
            <Layout>
              <MemberDashboard />
            </Layout>
          </ProtectedRoute>
        } 
      />
      
      {/* Newcomer Routes */}
      <Route 
        path="/newcomer/welcome" 
        element={
          <ProtectedRoute allowedRoles={['newcomer']}>
            <NewcomerWelcome />
          </ProtectedRoute>
        } 
      />
      
      {/* Default redirect based on user role */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to={
              user.role === 'pastor' ? '/pastor/dashboard' :
              user.role === 'worker' ? '/worker/dashboard' :
              user.role === 'member' ? '/member/dashboard' :
              '/newcomer/welcome'
            } />
          ) : (
            <Navigate to="/login" />
          )
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  )
}

export default App