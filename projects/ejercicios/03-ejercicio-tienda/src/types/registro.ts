import { z } from 'zod';

export const esquemaRegistro = z.object({
  nombreUsuario: z
    .string()
    .min(4, 'Mínimo 4 caracteres')
    .max(15, 'Máximo 15 caracteres')
    .regex(/^[a-zA-Z0-9]+$/, 'Solo letras y números, sin espacios'),

  correo: z
    .string()
    .min(1, 'El correo es obligatorio')
    .email('Ingresa un correo válido'),

  clave: z
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .regex(/[A-Z]/, 'Incluye al menos una mayúscula')
    .regex(/[0-9]/, 'Incluye al menos un número'),

  confirmarClave: z
    .string()
    .min(1, 'Confirma tu contraseña'),

  recibirOfertas: z.boolean().default(false),

  aceptoTerminos: z
    .boolean()
    .refine((v) => v === true, {
      message: 'Debes aceptar los términos para continuar',
    }),
}).refine((data) => data.clave === data.confirmarClave, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmarClave'],
});

export type DatosRegistro = z.infer<typeof esquemaRegistro>;
