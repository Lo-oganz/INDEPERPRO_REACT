export type View =
  | 'welcome'
  | 'login'
  | 'register'
  | 'homepage'
  | 'profile'
  | 'newTask'
  | 'adminView'
  | 'jefeProyectoView'
  | 'projectInfo'
  | 'newEtiqueta';

export interface User {
  id_usuario: number;
  nombre: string;
  email: string;
  id_rol?: number;  
}
//Aquí exportamos los tipos y demás para poder llamarlos a los views de forma foránea. 
//Es más fácil llamar a este fichero con todos los views que llamarlos en cada fichero uno por uno.
export type EstadoTarea = 'pendiente' | 'en progreso' | 'completada';

export interface Etiqueta {
  id_etiqueta: number;
  nombre: string;
}

export interface Task {
  id_tarea: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
  prioridad?: string;
  id_usuario: number;
  etiquetas: Etiqueta[];
}
