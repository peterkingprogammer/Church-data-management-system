import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTranslation } from '../lib/languages'
import { useAuth } from './AuthContext'
import { supabase } from '../lib/supabase'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('church_language') || 'en'
  })

  // Update language when user changes
  useEffect(() => {
    if (user?.language && user.language !== language) {
      setLanguageState(user.language)
      localStorage.setItem('church_language', user.language)
    }
  }, [user?.language])

  const setLanguage = async (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem('church_language', lang)
    
    // Update user's language preference in database if logged in
    if (user) {
      try {
        await supabase
          .from('users')
          .update({ language: lang })
          .eq('id', user.id)
      } catch (error) {
        console.error('Error updating user language:', error)
      }
    }
  }

  const t = (key: string) => getTranslation(key, language)

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}