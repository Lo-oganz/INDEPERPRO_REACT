// frontend/src/types.tsx
export type View =
  | 'welcome'
  | 'login'
  | 'register'
  | 'homepage'
  | 'profile'
  | 'newProject'
  | 'adminView'          // Nueva vista administrador
  | 'jefeProyectoView';  // Nueva vista jefe proyecto

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  id_rol?: number;  // opcional porque no siempre se usa
}

export interface Task {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: string;
  id_usuario: number;
}
