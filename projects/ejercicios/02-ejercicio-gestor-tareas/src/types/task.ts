export type Priority = "baja" | "media" | "alta";

export type Task = {
  id: number;
  title: string;
  priority: Priority;
  completed: boolean;
}

export type Filter = "todas" | "completadas" | "pendientes";