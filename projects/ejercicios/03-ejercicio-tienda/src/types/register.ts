// src/types/register.ts
import { z } from 'zod';

// Esquema de validación con Zod
export const RegisterSchema = z.object({
  username: z.string().min(3, "El nombre de usuario debe tener al menos 3 caracteres."),
  email: z.string().email("El formato del email es inválido."),
  password: z.string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula.")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número."),
  confirmPassword: z.string(),
  acceptNews: z.boolean().optional(), // Checkbox opcional
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden.",
  path: ["confirmPassword"], // Muestra el error debajo del campo confirmPassword
});

// Tipo derivado del esquema
export type RegisterFormValues = z.infer<typeof RegisterSchema>;