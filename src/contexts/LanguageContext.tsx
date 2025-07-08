import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'de' | 'fr' | 'es' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'app.title': 'Church Management System',
    'login.title': 'Welcome Back',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Sign In',
    'dashboard.title': 'Dashboard',
    'nav.dashboard': 'Dashboard',
    'nav.folders': 'Folders',
    'nav.calendar': 'Calendar',
    'nav.tasks': 'Tasks',
    'nav.newcomers': 'Newcomers',
    'nav.programs': 'Programs',
    'nav.souls': 'Souls Won',
    'nav.history': 'History',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout'
  },
  de: {
    'app.title': 'Kirchenverwaltungssystem',
    'login.title': 'Willkommen zurück',
    'login.email': 'E-Mail',
    'login.password': 'Passwort',
    'login.button': 'Anmelden',
    'dashboard.title': 'Dashboard',
    'nav.dashboard': 'Dashboard',
    'nav.folders': 'Ordner',
    'nav.calendar': 'Kalender',
    'nav.tasks': 'Aufgaben',
    'nav.newcomers': 'Neuankömmlinge',
    'nav.programs': 'Programme',
    'nav.souls': 'Seelen gewonnen',
    'nav.history': 'Geschichte',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden'
  },
  fr: {
    'app.title': 'Système de Gestion d\'Église',
    'login.title': 'Bon retour',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.button': 'Se connecter',
    'dashboard.title': 'Tableau de bord',
    'nav.dashboard': 'Tableau de bord',
    'nav.folders': 'Dossiers',
    'nav.calendar': 'Calendrier',
    'nav.tasks': 'Tâches',
    'nav.newcomers': 'Nouveaux arrivants',
    'nav.programs': 'Programmes',
    'nav.souls': 'Âmes gagnées',
    'nav.history': 'Historique',
    'nav.settings': 'Paramètres',
    'nav.logout': 'Déconnexion'
  },
  es: {
    'app.title': 'Sistema de Gestión de Iglesia',
    'login.title': 'Bienvenido de vuelta',
    'login.email': 'Correo electrónico',
    'login.password': 'Contraseña',
    'login.button': 'Iniciar sesión',
    'dashboard.title': 'Panel de control',
    'nav.dashboard': 'Panel',
    'nav.folders': 'Carpetas',
    'nav.calendar': 'Calendario',
    'nav.tasks': 'Tareas',
    'nav.newcomers': 'Recién llegados',
    'nav.programs': 'Programas',
    'nav.souls': 'Almas ganadas',
    'nav.history': 'Historial',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar sesión'
  },
  pt: {
    'app.title': 'Sistema de Gestão da Igreja',
    'login.title': 'Bem-vindo de volta',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.button': 'Entrar',
    'dashboard.title': 'Painel',
    'nav.dashboard': 'Painel',
    'nav.folders': 'Pastas',
    'nav.calendar': 'Calendário',
    'nav.tasks': 'Tarefas',
    'nav.newcomers': 'Recém-chegados',
    'nav.programs': 'Programas',
    'nav.souls': 'Almas ganhas',
    'nav.history': 'Histórico',
    'nav.settings': 'Configurações',
    'nav.logout': 'Sair'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}