import { z } from 'zod';

const existingEmails = ["test@example.com", "admin@example.com", "user@test.com"];

// Función para simular validación asíncrona en servidor
const checkEmailExists = async (email: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return existingEmails.includes(email.toLowerCase());
};

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),

  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),

  userName: z.string()
    .min(1, "El usuario es obligatorio")
    .min(8, "El usuario debe tener al menos 8 caracteres"),

  email: z
    .email({ message: "Email inválido" })
    .min(1, "El email es obligatorio")
    // Validación asíncrona con superRefine
    .superRefine(async (email, ctx) => {
      const exists = await checkEmailExists(email);

      if (exists) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Este email ya está registrado",
        });
      }
    }),

  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial"),

  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
