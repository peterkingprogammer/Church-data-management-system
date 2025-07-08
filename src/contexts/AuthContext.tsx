import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'pastor' | 'worker' | 'member' | 'newcomer';
  church_name?: string;
  joined_date?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  {
    id: '1',
    email: 'pastor@church.com',
    full_name: 'Pastor John Smith',
    role: 'pastor',
    church_name: 'Grace Community Church',
    joined_date: '2020-01-01'
  },
  {
    id: '2',
    email: 'worker@church.com',
    full_name: 'Mary Johnson',
    role: 'worker',
    church_name: 'Grace Community Church',
    joined_date: '2021-03-15'
  },
  {
    id: '3',
    email: 'member@church.com',
    full_name: 'David Wilson',
    role: 'member',
    church_name: 'Grace Community Church',
    joined_date: '2022-06-10'
  },
  {
    id: '4',
    email: 'newcomer@church.com',
    full_name: 'Sarah Brown',
    role: 'newcomer',
    church_name: 'Grace Community Church',
    joined_date: '2024-01-20'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('church_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check demo credentials
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('church_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('church_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}