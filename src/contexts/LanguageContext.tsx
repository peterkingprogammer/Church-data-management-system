import React, { createContext, useContext, useState, useEffect } from 'react'
import { getTranslation } from '../lib/languages'

interface LanguageContextType {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('church_language') || 'en'
  })

  const setLanguage = (lang: string) => {
    setLanguageState(lang)
    localStorage.setItem('church_language', lang)
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