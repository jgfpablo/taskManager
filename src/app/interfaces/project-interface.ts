export interface Member {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  created_by: string;
  members: Member[]; // ✅ ahora es un array de objetos Member
}

interface task {
  title: string | null;
  description?: string | null;
  projectId: string;
  status?: string | null;
  dueDate?: string | null;
  priority?: string | null;
}

