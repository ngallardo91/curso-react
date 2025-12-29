export type Task = {
  id: number;
  title: string;
  //priority: "baja" | "media" | "alta";
  priority:Priority;
  completed: boolean;
}

export type Priority="baja" | "media" | "alta";

export type Filter="todas" | "completadas" | "pendientes";
