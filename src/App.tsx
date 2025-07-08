import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import FoldersPage from './pages/FoldersPage';
import PDSummaryPage from './pages/PDSummaryPage';
import CalendarPage from './pages/CalendarPage';
import TasksPage from './pages/TasksPage';
import NewcomersPage from './pages/NewcomersPage';
import ProgramsPage from './pages/ProgramsPage';
import SoulsWonPage from './pages/SoulsWonPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import Layout from './components/Layout';
import './App.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <LanguageProvider>
          <ThemeProvider>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route 
                    path="/*" 
                    element={
                      <ProtectedRoute>
                        <Layout>
                          <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/folders" element={<FoldersPage />} />
                            <Route path="/pd-summary" element={<PDSummaryPage />} />
                            <Route path="/calendar" element={<CalendarPage />} />
                            <Route path="/tasks" element={<TasksPage />} />
                            <Route path="/newcomers" element={<NewcomersPage />} />
                            <Route path="/programs" element={<ProgramsPage />} />
                            <Route path="/souls-won" element={<SoulsWonPage />} />
                            <Route path="/history" element={<HistoryPage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/" element={<Navigate to="/dashboard" />} />
                          </Routes>
                        </Layout>
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </div>
            </Router>
          </ThemeProvider>
        </LanguageProvider>
      </SubscriptionProvider>
    </AuthProvider>
  );
}

export default App;