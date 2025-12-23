export interface User {
  username: string;
  email: string;
  password: string;
  acceptNews: boolean;
}

import { z } from "zod";

export const userSchema = z
  .object({
    username: z
      .string()
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder 50 caracteres"),

    email: z.email("Debe ser un email válido").min(1, "El email es requerido"),

    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .max(100, "La contraseña no puede exceder 100 caracteres"),

    confirmPassword: z
      .string()
      .min(1, "La confirmación de la contraseña es requerida"),

    acceptNews: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type UserFormData = z.infer<typeof userSchema>;
