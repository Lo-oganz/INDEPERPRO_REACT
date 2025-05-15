export type View =
  | 'welcome'
  | 'login'
  | 'register'
  | 'dashboard'
  | 'homepage'
  | 'profile'
  | 'newProject';

export interface Project {
  id_proyecto: number;
  nombre: string;
  descripcion: string;
  estado: string;
}

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
}

export interface Task {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: string;
  prioridad: string;
  fec_vencimiento: string;
  id_usuario: number;
  id_proyecto: number;
}
