/*
  # Church Management System Database Schema
  
  1. New Tables
    - users (extends Supabase auth with church-specific fields)
    - departments (church departments/ministries)
    - user_departments (many-to-many relationship)
    - permissions (granular user permissions)
    - attendance (service attendance tracking)
    - tasks (task assignment and tracking)
    - folders (document organization)
    - folder_comments (collaborative comments)
    - follow_ups (newcomer follow-up tracking)
    - department_reports (weekly/monthly reports)
    - subscriptions (internal billing tracking)
    - notices (church announcements)
    - excuses (member absence requests)
    - programs (church programs and events)
    - souls_won (conversion tracking)
    - pd_reports (Pastor's Desk communications)
    - bible_verses (scripture content)
    - pdf_files (file upload metadata)

  2. Security
    - Enable RLS on all tables
    - Role-based policies for data access
    - Secure file upload handling
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('pastor', 'worker', 'member', 'newcomer')),
  department_id uuid,
  language text DEFAULT 'en',
  profile_picture text,
  phone text,
  address text,
  joined_at date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- User departments (many-to-many)
CREATE TABLE IF NOT EXISTS user_departments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  assigned_at timestamptz DEFAULT now()
);

-- Permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  module text NOT NULL,
  can_view boolean DEFAULT false,
  can_edit boolean DEFAULT false,
  assigned_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Attendance table
CREATE TABLE IF NOT EXISTS attendance (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  date date DEFAULT CURRENT_DATE,
  time_in time,
  status text DEFAULT 'present' CHECK (status IN ('present', 'absent', 'excused')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assigned_by uuid REFERENCES users(id),
  assigned_to uuid REFERENCES users(id),
  task_text text NOT NULL,
  due_date date,
  is_completed boolean DEFAULT false,
  completed_at timestamptz,
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  created_at timestamptz DEFAULT now()
);

-- Folders table
CREATE TABLE IF NOT EXISTS folders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  type text DEFAULT 'general',
  department_id uuid REFERENCES departments(id),
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Folder comments table
CREATE TABLE IF NOT EXISTS folder_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  folder_id uuid REFERENCES folders(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id),
  comment text NOT NULL,
  comment_type text DEFAULT 'general' CHECK (comment_type IN ('general', 'service_note', 'pd_note', 'internal_update')),
  created_at timestamptz DEFAULT now()
);

-- Follow-ups table
CREATE TABLE IF NOT EXISTS follow_ups (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  newcomer_id uuid REFERENCES users(id),
  assigned_worker_id uuid REFERENCES users(id),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'completed')),
  last_contacted date,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Department reports table
CREATE TABLE IF NOT EXISTS department_reports (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id uuid REFERENCES departments(id),
  submitted_by uuid REFERENCES users(id),
  report_content text,
  file_url text,
  week text,
  status text DEFAULT 'submitted',
  created_at timestamptz DEFAULT now()
);

-- Subscriptions table (internal tracking)
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  amount decimal(10,2) NOT NULL,
  date date DEFAULT CURRENT_DATE,
  purpose text NOT NULL,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  church_id uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Notices table
CREATE TABLE IF NOT EXISTS notices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  created_by uuid REFERENCES users(id),
  target_audience text DEFAULT 'all' CHECK (target_audience IN ('all', 'members', 'workers', 'pastors')),
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'draft')),
  expires_at date,
  created_at timestamptz DEFAULT now()
);

-- Excuses table
CREATE TABLE IF NOT EXISTS excuses (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id),
  reason text NOT NULL,
  date_from date NOT NULL,
  date_to date,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_by uuid REFERENCES users(id),
  reviewed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Programs table
CREATE TABLE IF NOT EXISTS programs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  type text DEFAULT 'service' CHECK (type IN ('service', 'study', 'youth', 'prayer', 'crusade', 'special')),
  schedule text,
  location text,
  status text DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'completed')),
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now()
);

-- Souls won table
CREATE TABLE IF NOT EXISTS souls_won (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  age integer,
  phone text,
  email text,
  program_id uuid REFERENCES programs(id),
  counselor_id uuid REFERENCES users(id),
  date_won date DEFAULT CURRENT_DATE,
  notes text,
  follow_up_status text DEFAULT 'pending' CHECK (follow_up_status IN ('pending', 'contacted', 'integrated')),
  created_at timestamptz DEFAULT now()
);

-- PD Summary table
CREATE TABLE IF NOT EXISTS pd_reports (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id uuid REFERENCES users(id),
  receiver_id uuid REFERENCES users(id),
  title text NOT NULL,
  content text NOT NULL,
  type text DEFAULT 'service_report' CHECK (type IN ('service_report', 'pastor_directive')),
  service_date date,
  target_audience text DEFAULT 'all_staff',
  created_at timestamptz DEFAULT now()
);

-- Bible verses table (for app content)
CREATE TABLE IF NOT EXISTS bible_verses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book text NOT NULL,
  chapter integer NOT NULL CHECK (chapter > 0),
  verse integer NOT NULL CHECK (verse > 0),
  text text NOT NULL,
  language text DEFAULT 'english' CHECK (language IN ('english', 'french', 'german', 'yoruba')),
  created_at timestamptz DEFAULT now()
);

-- PDF files table (for file uploads)
CREATE TABLE IF NOT EXISTS pdf_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  entity_type text NOT NULL CHECK (entity_type IN ('folder', 'summary', 'report', 'program', 'task', 'notice', 'excuse', 'department_report')),
  entity_id uuid,
  uploaded_by uuid REFERENCES users(id),
  uploaded_by_name text NOT NULL,
  file_type text DEFAULT 'pdf',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE folder_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE follow_ups ENABLE ROW LEVEL SECURITY;
ALTER TABLE department_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE excuses ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE souls_won ENABLE ROW LEVEL SECURITY;
ALTER TABLE pd_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE bible_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdf_files ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DO $$ 
BEGIN
    -- Users policies
    DROP POLICY IF EXISTS "Users can view own profile" ON users;
    DROP POLICY IF EXISTS "Users can update own profile" ON users;
    DROP POLICY IF EXISTS "Pastor can view all users" ON users;
    DROP POLICY IF EXISTS "Pastor can update all users" ON users;
    DROP POLICY IF EXISTS "Pastor can insert users" ON users;
    DROP POLICY IF EXISTS "Pastor can delete users" ON users;
    
    -- Attendance policies
    DROP POLICY IF EXISTS "Users can view own attendance" ON attendance;
    DROP POLICY IF EXISTS "Users can insert own attendance" ON attendance;
    DROP POLICY IF EXISTS "Pastor and Worker can view all attendance" ON attendance;
    DROP POLICY IF EXISTS "Pastor and Worker can insert attendance" ON attendance;
    
    -- Tasks policies
    DROP POLICY IF EXISTS "Users can view assigned tasks" ON tasks;
    DROP POLICY IF EXISTS "Pastor and Worker can create tasks" ON tasks;
    DROP POLICY IF EXISTS "Users can update own tasks" ON tasks;
    
    -- Folders policies
    DROP POLICY IF EXISTS "Pastor and Worker can view folders" ON folders;
    DROP POLICY IF EXISTS "Pastor and Worker can create folders" ON folders;
    
    -- Folder comments policies
    DROP POLICY IF EXISTS "Users can view folder comments" ON folder_comments;
    DROP POLICY IF EXISTS "Users can create folder comments" ON folder_comments;
    
    -- Follow-ups policies
    DROP POLICY IF EXISTS "Pastor and Worker can view follow-ups" ON follow_ups;
    DROP POLICY IF EXISTS "Pastor and Worker can create follow-ups" ON follow_ups;
    
    -- Notices policies
    DROP POLICY IF EXISTS "All users can view notices" ON notices;
    DROP POLICY IF EXISTS "Pastor and Worker can create notices" ON notices;
    
    -- Excuses policies
    DROP POLICY IF EXISTS "Users can view own excuses" ON excuses;
    DROP POLICY IF EXISTS "Users can create own excuses" ON excuses;
    DROP POLICY IF EXISTS "Pastor and Worker can view all excuses" ON excuses;
    
    -- Programs policies
    DROP POLICY IF EXISTS "All users can view programs" ON programs;
    DROP POLICY IF EXISTS "Pastor and Worker can create programs" ON programs;
    
    -- Souls won policies
    DROP POLICY IF EXISTS "Pastor and Worker can view souls won" ON souls_won;
    DROP POLICY IF EXISTS "Pastor and Worker can create souls won" ON souls_won;
    
    -- PD reports policies
    DROP POLICY IF EXISTS "Pastor can view all PD reports" ON pd_reports;
    DROP POLICY IF EXISTS "Worker can view own PD reports" ON pd_reports;
    DROP POLICY IF EXISTS "Pastor and Worker can create PD reports" ON pd_reports;
    
    -- Bible verses policies
    DROP POLICY IF EXISTS "Bible verses are publicly readable" ON bible_verses;
    
    -- PDF files policies
    DROP POLICY IF EXISTS "Users can view PDF files" ON pdf_files;
    DROP POLICY IF EXISTS "Pastor and Worker can upload PDF files" ON pdf_files;
    
    -- Subscriptions policies
    DROP POLICY IF EXISTS "Pastor can view subscriptions" ON subscriptions;
    
    -- Department policies
    DROP POLICY IF EXISTS "All users can view departments" ON departments;
    DROP POLICY IF EXISTS "Pastor can manage departments" ON departments;
    
    -- Permissions policies
    DROP POLICY IF EXISTS "Pastor can manage permissions" ON permissions;
    DROP POLICY IF EXISTS "Users can view own permissions" ON permissions;
    
    -- Department reports policies
    DROP POLICY IF EXISTS "Pastor can view all department reports" ON department_reports;
    DROP POLICY IF EXISTS "Worker can view own department reports" ON department_reports;
    DROP POLICY IF EXISTS "Worker can submit department reports" ON department_reports;
    
    -- User departments policies
    DROP POLICY IF EXISTS "Users can view own department assignments" ON user_departments;
    DROP POLICY IF EXISTS "Pastor can manage user departments" ON user_departments;
END $$;

-- Create RLS Policies

-- Users policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Pastor can view all users" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);
CREATE POLICY "Pastor can update all users" ON users FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);
CREATE POLICY "Pastor can insert users" ON users FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);
CREATE POLICY "Pastor can delete users" ON users FOR DELETE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);

-- Attendance policies
CREATE POLICY "Users can view own attendance" ON attendance FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can insert own attendance" ON attendance FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Pastor and Worker can view all attendance" ON attendance FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);
CREATE POLICY "Pastor and Worker can insert attendance" ON attendance FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Tasks policies
CREATE POLICY "Users can view assigned tasks" ON tasks FOR SELECT USING (
  assigned_to = auth.uid() OR assigned_by = auth.uid()
);
CREATE POLICY "Pastor and Worker can create tasks" ON tasks FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);
CREATE POLICY "Users can update own tasks" ON tasks FOR UPDATE USING (
  assigned_to = auth.uid() OR assigned_by = auth.uid()
);

-- Folders policies
CREATE POLICY "Pastor and Worker can view folders" ON folders FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);
CREATE POLICY "Pastor and Worker can create folders" ON folders FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Folder comments policies
CREATE POLICY "Users can view folder comments" ON folder_comments FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);
CREATE POLICY "Users can create folder comments" ON folder_comments FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Follow-ups policies
CREATE POLICY "Pastor and Worker can view follow-ups" ON follow_ups FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);
CREATE POLICY "Pastor and Worker can create follow-ups" ON follow_ups FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Notices policies
CREATE POLICY "All users can view notices" ON notices FOR SELECT USING (true);
CREATE POLICY "Pastor and Worker can create notices" ON notices FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Excuses policies
CREATE POLICY "Users can view own excuses" ON excuses FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create own excuses" ON excuses FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Pastor and Worker can view all excuses" ON excuses FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Programs policies
CREATE POLICY "All users can view programs" ON programs FOR SELECT USING (true);
CREATE POLICY "Pastor and Worker can create programs" ON programs FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Souls won policies
CREATE POLICY "Pastor and Worker can view souls won" ON souls_won FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);
CREATE POLICY "Pastor and Worker can create souls won" ON souls_won FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- PD reports policies
CREATE POLICY "Pastor can view all PD reports" ON pd_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);
CREATE POLICY "Worker can view own PD reports" ON pd_reports FOR SELECT USING (
  sender_id = auth.uid() OR receiver_id = auth.uid()
);
CREATE POLICY "Pastor and Worker can create PD reports" ON pd_reports FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Bible verses policies (public read)
CREATE POLICY "Bible verses are publicly readable" ON bible_verses FOR SELECT USING (true);

-- PDF files policies
CREATE POLICY "Users can view PDF files" ON pdf_files FOR SELECT USING (true);
CREATE POLICY "Pastor and Worker can upload PDF files" ON pdf_files FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('pastor', 'worker'))
);

-- Subscriptions policies (Pastor only)
CREATE POLICY "Pastor can view subscriptions" ON subscriptions FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);

-- Department policies
CREATE POLICY "All users can view departments" ON departments FOR SELECT USING (true);
CREATE POLICY "Pastor can manage departments" ON departments FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);

-- Permissions policies
CREATE POLICY "Pastor can manage permissions" ON permissions FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);
CREATE POLICY "Users can view own permissions" ON permissions FOR SELECT USING (user_id = auth.uid());

-- Department reports policies
CREATE POLICY "Pastor can view all department reports" ON department_reports FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);
CREATE POLICY "Worker can view own department reports" ON department_reports FOR SELECT USING (
  submitted_by = auth.uid()
);
CREATE POLICY "Worker can submit department reports" ON department_reports FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'worker')
);

-- User departments policies
CREATE POLICY "Users can view own department assignments" ON user_departments FOR SELECT USING (
  user_id = auth.uid()
);
CREATE POLICY "Pastor can manage user departments" ON user_departments FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'pastor')
);

-- Insert some initial data
INSERT INTO departments (name, description) VALUES
  ('Worship Team', 'Music and worship ministry'),
  ('Youth Ministry', 'Youth programs and activities'),
  ('Children Ministry', 'Children programs and Sunday school'),
  ('Evangelism', 'Outreach and evangelism activities'),
  ('Administration', 'Church administration and management')
ON CONFLICT (name) DO NOTHING;

-- Insert Bible verse for branding
INSERT INTO bible_verses (book, chapter, verse, text, language) VALUES
  ('Matthew', 6, 33, 'But seek first his kingdom and his righteousness, and all these things will be given to you as well.', 'english')
ON CONFLICT DO NOTHING;

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (new.id, new.email, COALESCE(new.raw_user_meta_data->>'full_name', new.email), 'newcomer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();