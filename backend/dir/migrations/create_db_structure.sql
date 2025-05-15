
-- Ativar extensão UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Configurações públicas
ALTER PUBLICATION supabase_realtime ADD TABLE public.users;
ALTER PUBLICATION supabase_realtime ADD TABLE public.talent_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.hr_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.manager_profiles;
ALTER PUBLICATION supabase_realtime ADD TABLE public.projects;
ALTER PUBLICATION supabase_realtime ADD TABLE public.submissions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.feedback;
ALTER PUBLICATION supabase_realtime ADD TABLE public.invitations;

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    profile_type TEXT NOT NULL CHECK (profile_type IN ('talent', 'hr', 'manager')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de perfis de talentos
CREATE TABLE IF NOT EXISTS public.talent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    interest_area TEXT NOT NULL,
    portfolio_link TEXT,
    avatar_url TEXT,
    bio TEXT,
    skills TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de perfis de RH
CREATE TABLE IF NOT EXISTS public.hr_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    company TEXT NOT NULL,
    cnpj TEXT NOT NULL,
    avatar_url TEXT,
    department TEXT,
    position TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de perfis de gestores
CREATE TABLE IF NOT EXISTS public.manager_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    company TEXT NOT NULL,
    position TEXT NOT NULL,
    talent_search_area TEXT NOT NULL,
    avatar_url TEXT,
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de empresas
CREATE TABLE IF NOT EXISTS public.companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    description TEXT,
    logo_url TEXT,
    industry TEXT,
    size TEXT,
    website TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de projetos
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    company_id UUID REFERENCES public.companies(id),
    hr_id UUID REFERENCES public.hr_profiles(id),
    requirements TEXT,
    deadline TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'closed', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de submissões
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    talent_id UUID REFERENCES public.talent_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    file_urls TEXT[],
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'under_review', 'approved', 'rejected')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de feedbacks
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
    hr_id UUID REFERENCES public.hr_profiles(id),
    content TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de convites
CREATE TABLE IF NOT EXISTS public.invitations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    talent_id UUID REFERENCES public.talent_profiles(id) ON DELETE CASCADE,
    manager_id UUID REFERENCES public.manager_profiles(id),
    submission_id UUID REFERENCES public.submissions(id),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    message TEXT,
    meeting_date TIMESTAMP WITH TIME ZONE,
    meeting_link TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de mensagens
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_user_id UUID NOT NULL REFERENCES public.users(id),
    to_user_id UUID NOT NULL REFERENCES public.users(id),
    content TEXT NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Funções e gatilhos para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Gatilhos para atualizar updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_talent_profiles_updated_at
BEFORE UPDATE ON public.talent_profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_hr_profiles_updated_at
BEFORE UPDATE ON public.hr_profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_manager_profiles_updated_at
BEFORE UPDATE ON public.manager_profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_submissions_updated_at
BEFORE UPDATE ON public.submissions
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_feedback_updated_at
BEFORE UPDATE ON public.feedback
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

CREATE TRIGGER update_invitations_updated_at
BEFORE UPDATE ON public.invitations
FOR EACH ROW EXECUTE PROCEDURE update_updated_at();

-- RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.talent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hr_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manager_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view their own user data"
ON public.users
FOR SELECT
USING (auth.uid() = id);

-- Políticas para talent_profiles
CREATE POLICY "Talent profiles are viewable by all authenticated users"
ON public.talent_profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Talents can update their own profile"
ON public.talent_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Políticas para hr_profiles
CREATE POLICY "HR profiles are viewable by all authenticated users"
ON public.hr_profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "HR can update their own profile"
ON public.hr_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Políticas para manager_profiles
CREATE POLICY "Manager profiles are viewable by all authenticated users"
ON public.manager_profiles
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Managers can update their own profile"
ON public.manager_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- Políticas para projects
CREATE POLICY "Projects are viewable by all authenticated users"
ON public.projects
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "HR can insert and update projects"
ON public.projects
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.hr_profiles 
    WHERE user_id = auth.uid() 
    AND id = hr_id
  )
);

-- Políticas para submissions
CREATE POLICY "Submissions are viewable by all authenticated users"
ON public.submissions
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Talents can insert and update their own submissions"
ON public.submissions
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.talent_profiles 
    WHERE user_id = auth.uid() 
    AND id = talent_id
  )
);

-- Políticas para feedback
CREATE POLICY "Feedback is viewable by all authenticated users"
ON public.feedback
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "HR can insert and update feedback"
ON public.feedback
FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM public.hr_profiles 
    WHERE user_id = auth.uid() 
    AND id = hr_id
  )
);

-- Políticas para invitations
CREATE POLICY "Invitations are viewable by the talent and manager involved"
ON public.invitations
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.talent_profiles 
    WHERE user_id = auth.uid() 
    AND id = talent_id
  ) OR
  EXISTS (
    SELECT 1 FROM public.manager_profiles 
    WHERE user_id = auth.uid() 
    AND id = manager_id
  )
);

CREATE POLICY "Managers can insert invitations"
ON public.invitations
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.manager_profiles 
    WHERE user_id = auth.uid() 
    AND id = manager_id
  )
);

CREATE POLICY "Talents can update their invitation status"
ON public.invitations
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.talent_profiles 
    WHERE user_id = auth.uid() 
    AND id = talent_id
  )
);

-- Políticas para mensagens
CREATE POLICY "Users can read messages sent to or from them"
ON public.messages
FOR SELECT
USING (
  auth.uid() = from_user_id OR
  auth.uid() = to_user_id
);

CREATE POLICY "Users can send messages"
ON public.messages
FOR INSERT
WITH CHECK (
  auth.uid() = from_user_id
);

CREATE POLICY "Users can mark messages as read if they are the recipient"
ON public.messages
FOR UPDATE
USING (
  auth.uid() = to_user_id
);
