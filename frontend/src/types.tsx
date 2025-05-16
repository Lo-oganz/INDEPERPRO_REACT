export type View =
  | 'welcome'
  | 'login'
  | 'register'
  | 'homepage'
  | 'profile'
  | 'newProject';


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
  id_usuario: number;
}

