import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(20, 'El usuario no puede exceder 20 caracteres')
    .regex(/^[a-zA-Z0-9_]+$/, 'Solo letras, números y guiones bajos'),

  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('Debe ser un email válido'),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número')
    .regex(/[^A-Za-z0-9]/, 'Debe contener al menos un carácter especial'),

  confirmPassword: z
    .string()
    .min(1, 'Confirma tu contraseña'),

  acceptNewsletter: z.boolean().optional(),

  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
