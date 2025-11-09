export type Task = {
  id: number;
  title: string;
  priority: "baja" | "media" | "alta";
  completed: boolean;
}
