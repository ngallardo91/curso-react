import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(5, 'El nombre de usuario debe tener al menos 5 caracteres')
    .max(50, 'El nombre de usuario no puede exceder 50 caracteres'),

  email: z
    .string()
    .email('Debe ser un email válido')
    .min(1, 'El email es requerido'),

  // Dirección de envío
  password: z
    .string()
    .min(5, 'La contraseña debe tener al menos 5 caracteres')
    .max(50, 'La contraseña no puede exceder 50 caracteres'),

  confirmPassword: z
    .string()
    .min(5, 'La confirmación de la contraseña debe tener al menos 5 caracteres')
    .max(50, 'La confirmación de la contraseña no puede exceder 50 caracteres'),

  receiveNewsletter: z
    .boolean()
  /*.refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),*/
})
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
