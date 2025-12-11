import { z } from 'zod';

export const baseSchema = z.object({
  // Información personal
  username: z
    .string()
    .min(2, 'El username debe tener al menos 2 caracteres')
    .max(50, 'El username no puede exceder 50 caracteres'),
  
  email: z
    .string()
    .email('Debe ser un email válido')
    .min(1, 'El email es requerido'),
  
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres.')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula.')
    .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula.')
    .regex(/[0-9]/, 'La contraseña debe contener al menos un número.')
    .regex(/[^a-zA-Z0-9]/, 'La contraseña debe contener al menos un carácter especial.'),

  confirmPassword: z
    .string()
    .min(1, 'La confirmación de contraseña no puede estar vacía.'),

  acceptNews: z
    .boolean(),
});

export const registerSchema = baseSchema.refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden.',
  path: ['confirmPassword'], 
});

// ⭐️ 3. EXPORTACIÓN DEL TIPO: BASADO EN EL ESQUEMA FINAL Y REFINADO ⭐️
// Usamos un nombre diferente (RegisterFormType) para evitar el conflicto de exportación.
export type RegisterFormType = z.infer<typeof registerSchema>;
