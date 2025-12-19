import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede exceder 20 caracteres'),
  
  email: z
    .string()
    .email('Debe ser un email válido')
    .min(1, 'El email es requerido'),
  
  password: z
    .string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  
  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),
  
  acceptNewsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

