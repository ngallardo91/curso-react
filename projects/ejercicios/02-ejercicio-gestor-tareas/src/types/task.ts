export type Priority = "baja" | "media" | "alta";
export type Filter = "todas" | "completadas" | "pendientes";
export interface Task {
  id: number;
  title: string;
  priority: Priority;
  completed: boolean;
}