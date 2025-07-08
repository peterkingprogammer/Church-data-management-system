export interface Language {
  code: string
  name: string
  nativeName: string
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Yorùbá' },
  { code: 'ig', name: 'Igbo', nativeName: 'Igbo' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'fa', name: 'Persian', nativeName: 'فارسی' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली' },
  { code: 'si', name: 'Sinhala', nativeName: 'සිංහල' },
  { code: 'my', name: 'Myanmar', nativeName: 'မြန်မာ' },
  { code: 'km', name: 'Khmer', nativeName: 'ខ្មែរ' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ' },
  { code: 'ka', name: 'Georgian', nativeName: 'ქართული' },
  { code: 'hy', name: 'Armenian', nativeName: 'Հայերեն' },
  { code: 'az', name: 'Azerbaijani', nativeName: 'Azərbaycan' },
  { code: 'kk', name: 'Kazakh', nativeName: 'Қазақша' },
  { code: 'ky', name: 'Kyrgyz', nativeName: 'Кыргызча' },
  { code: 'uz', name: 'Uzbek', nativeName: 'O\'zbek' },
  { code: 'tg', name: 'Tajik', nativeName: 'Тоҷикӣ' },
  { code: 'mn', name: 'Mongolian', nativeName: 'Монгол' },
  { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
  { code: 'ti', name: 'Tigrinya', nativeName: 'ትግርኛ' },
  { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo' },
  { code: 'so', name: 'Somali', nativeName: 'Soomaali' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda' },
  { code: 'rn', name: 'Kirundi', nativeName: 'Ikirundi' },
  { code: 'lg', name: 'Luganda', nativeName: 'Luganda' },
  { code: 'zu', name: 'Zulu', nativeName: 'isiZulu' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa' },
  { code: 'af', name: 'Afrikaans', nativeName: 'Afrikaans' },
  { code: 'st', name: 'Sesotho', nativeName: 'Sesotho' },
  { code: 'tn', name: 'Setswana', nativeName: 'Setswana' },
  { code: 'ss', name: 'Siswati', nativeName: 'siSwati' },
  { code: 've', name: 'Venda', nativeName: 'Tshivenḓa' },
  { code: 'ts', name: 'Tsonga', nativeName: 'Xitsonga' },
  { code: 'nr', name: 'Ndebele', nativeName: 'isiNdebele' }
]

export const translations = {
  en: {
    // Common
    'app.title': 'Church Data Management System',
    'company.name': 'AMEN TECH',
    'company.tagline': 'Building systems that serves God\'s kingdom',
    'bible.verse': 'Matthew 6:33',
    'login': 'Sign in',
    'logout': 'Logout',
    'email': 'Email address',
    'password': 'Password',
    'language': 'Language',
    'search': 'Search',
    'save': 'Save',
    'cancel': 'Cancel',
    'delete': 'Delete',
    'edit': 'Edit',
    'add': 'Add',
    'create': 'Create',
    'update': 'Update',
    'submit': 'Submit',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.folders': 'Folders',
    'nav.pd_summary': 'PD Summary',
    'nav.calendar': 'Calendar',
    'nav.tasks': 'Tasks',
    'nav.programs': 'Programs',
    'nav.attendance': 'Attendance',
    'nav.souls_won': 'Souls Won',
    'nav.follow_ups': 'Follow-ups',
    'nav.department_reports': 'Department Reports',
    'nav.notices': 'Notices',
    'nav.excuses': 'Excuses',
    'nav.permissions': 'Permissions',
    'nav.history': 'History',
    'nav.profile': 'My Profile',
    'nav.settings': 'Settings',
    'nav.events': 'Events',
    'nav.my_information': 'My Information',
    'nav.my_excuses': 'My Excuses',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Here\'s your church management overview',
    'dashboard.today_attendance': 'Today\'s Attendance',
    'dashboard.weekly_attendance': 'Weekly Attendance',
    'dashboard.pending_tasks': 'Pending Tasks',
    'dashboard.active_notices': 'Active Notices',
    'dashboard.souls_won': 'Souls Won',
    'dashboard.new_visitors': 'New Visitors',
    'dashboard.active_programs': 'Active Programs',
    'dashboard.recent_activity': 'Recent Activity',
    'dashboard.upcoming_events': 'Upcoming Events',
    'dashboard.quick_actions': 'Quick Actions',
    'dashboard.church_information': 'Church Information',
    
    // Quick Actions
    'action.mark_attendance': 'Mark Attendance',
    'action.view_notices': 'View Notices',
    'action.submit_excuse': 'Submit Excuse',
    'action.add_newcomer': 'Add Newcomer',
    'action.record_soul_won': 'Record Soul Won',
    'action.complete_profile': 'Complete Profile',
    
    // Forms
    'form.full_name': 'Full Name',
    'form.phone': 'Phone Number',
    'form.address': 'Address',
    'form.department': 'Department',
    'form.role': 'Role',
    'form.date': 'Date',
    'form.time': 'Time',
    'form.status': 'Status',
    'form.notes': 'Notes',
    'form.description': 'Description',
    'form.title': 'Title',
    'form.due_date': 'Due Date',
    'form.priority': 'Priority',
    
    // Roles
    'role.pastor': 'Pastor',
    'role.worker': 'Worker',
    'role.member': 'Member',
    'role.newcomer': 'Newcomer',
    
    // Status
    'status.active': 'Active',
    'status.inactive': 'Inactive',
    'status.pending': 'Pending',
    'status.completed': 'Completed',
    'status.present': 'Present',
    'status.absent': 'Absent',
    'status.excused': 'Excused',
    
    // Messages
    'message.login_success': 'Login successful',
    'message.login_error': 'Invalid email or password',
    'message.profile_updated': 'Profile updated successfully',
    'message.task_created': 'Task created successfully',
    'message.attendance_marked': 'Attendance marked successfully',
    'message.excuse_submitted': 'Excuse submitted successfully',
    
    // Footer
    'footer.copyright': '© 2025 AMEN TECH. All rights reserved.',
    'footer.verse_reference': 'Matthew 6:33'
  },
  
  // Add more languages as needed
  es: {
    'app.title': 'Sistema de Gestión de Datos de la Iglesia',
    'company.name': 'AMEN TECH',
    'company.tagline': 'Construyendo sistemas que sirven al reino de Dios',
    'bible.verse': 'Mateo 6:33',
    'login': 'Iniciar sesión',
    'logout': 'Cerrar sesión',
    'email': 'Dirección de correo electrónico',
    'password': 'Contraseña',
    'language': 'Idioma',
    // ... add more translations
  },
  
  fr: {
    'app.title': 'Système de Gestion des Données de l\'Église',
    'company.name': 'AMEN TECH',
    'company.tagline': 'Construire des systèmes qui servent le royaume de Dieu',
    'bible.verse': 'Matthieu 6:33',
    'login': 'Se connecter',
    'logout': 'Se déconnecter',
    'email': 'Adresse e-mail',
    'password': 'Mot de passe',
    'language': 'Langue',
    // ... add more translations
  }
}

export function getTranslation(key: string, language: string = 'en'): string {
  const langTranslations = translations[language as keyof typeof translations] || translations.en
  return langTranslations[key as keyof typeof langTranslations] || key
}