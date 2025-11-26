import { z } from 'zod';

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'El usuario debe tener al menos 3 caracteres' })
    .max(20, { message: 'El usuario no puede tener más de 20 caracteres' }),
  
  email: z
    .string()
    .email({ message: 'Debes ingresar un email válido' }),
  
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    .regex(/[A-Z]/, { message: 'Debe contener al menos una mayúscula' })
    .regex(/[0-9]/, { message: 'Debe contener al menos un número' }),
  
  confirmPassword: z.string(),
  
  terms: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar los términos y condiciones",
  }),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;