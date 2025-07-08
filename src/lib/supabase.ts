import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  role: 'pastor' | 'worker' | 'member' | 'newcomer'
  department_id?: string
  language: string
  profile_picture?: string
  phone?: string
  address?: string
  joined_at: string
  created_at: string
}

export interface Department {
  id: string
  name: string
  description?: string
  created_at: string
}

export interface Attendance {
  id: string
  user_id: string
  date: string
  time_in?: string
  status: 'present' | 'absent' | 'excused'
  created_at: string
}

export interface Task {
  id: string
  assigned_by: string
  assigned_to: string
  task_text: string
  due_date?: string
  is_completed: boolean
  completed_at?: string
  created_at: string
}

export interface Folder {
  id: string
  title: string
  department_id?: string
  created_by: string
  created_at: string
}

export interface FolderComment {
  id: string
  folder_id: string
  text: string
  user_id: string
  created_at: string
}

export interface FollowUp {
  id: string
  newcomer_id: string
  worker_id: string
  notes?: string
  status: 'pending' | 'contacted' | 'completed'
  created_at: string
}

export interface DepartmentReport {
  id: string
  department_id: string
  file_url: string
  submitted_by: string
  submitted_at: string
}

export interface Subscription {
  id: string
  amount: number
  date: string
  purpose: string
  status: 'active' | 'inactive' | 'pending'
  created_at: string
}