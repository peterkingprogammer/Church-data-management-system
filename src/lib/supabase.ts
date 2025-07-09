import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
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
  church_name?: string
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
  notes?: string
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
  priority: 'low' | 'medium' | 'high'
  created_at: string
}

export interface Folder {
  id: string
  title: string
  type: string
  department_id?: string
  created_by: string
  created_at: string
}

export interface FolderComment {
  id: string
  folder_id: string
  user_id: string
  comment: string
  comment_type: 'general' | 'service_note' | 'pd_note' | 'internal_update'
  created_at: string
}

export interface FollowUp {
  id: string
  newcomer_id: string
  assigned_worker_id: string
  status: 'pending' | 'contacted' | 'completed'
  last_contacted?: string
  notes?: string
  created_at: string
}

export interface DepartmentReport {
  id: string
  department_id: string
  submitted_by: string
  report_content?: string
  file_url?: string
  week?: string
  status: string
  created_at: string
}

export interface Subscription {
  id: string
  amount: number
  date: string
  purpose: string
  status: 'active' | 'inactive' | 'pending'
  church_id: string
  created_at: string
}

export interface Notice {
  id: string
  title: string
  content: string
  created_by: string
  target_audience: 'all' | 'members' | 'workers' | 'pastors'
  status: 'active' | 'inactive' | 'draft'
  expires_at?: string
  created_at: string
}

export interface Excuse {
  id: string
  user_id: string
  reason: string
  date_from: string
  date_to?: string
  status: 'pending' | 'approved' | 'rejected'
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
}

export interface Program {
  id: string
  name: string
  description?: string
  type: 'service' | 'study' | 'youth' | 'prayer' | 'crusade' | 'special'
  schedule?: string
  location?: string
  status: 'active' | 'inactive' | 'completed'
  created_by: string
  created_at: string
}

export interface SoulWon {
  id: string
  name: string
  age?: number
  phone?: string
  email?: string
  program_id?: string
  counselor_id: string
  date_won: string
  notes?: string
  follow_up_status: 'pending' | 'contacted' | 'integrated'
  created_at: string
}

export interface PDReport {
  id: string
  sender_id: string
  receiver_id?: string
  title: string
  content: string
  type: 'service_report' | 'pastor_directive'
  service_date?: string
  target_audience: string
  created_at: string
}