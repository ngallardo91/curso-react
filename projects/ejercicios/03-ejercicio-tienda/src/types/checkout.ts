import { z } from 'zod';

export const checkoutSchema = z.object({
  // Información personal
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres'),
  
  lastName: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede exceder 50 caracteres'),
  
  email: z
    .string()
    .email('Debe ser un email válido')
    .min(1, 'El email es requerido'),
  
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Debe ser un número de teléfono válido'),
  
  // Dirección de envío
  address: z
    .string()
    .min(5, 'La dirección debe tener al menos 5 caracteres')
    .max(100, 'La dirección no puede exceder 100 caracteres'),
  
  city: z
    .string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres'),
  
  state: z
    .string()
    .min(2, 'El estado/provincia es requerido'),
  
  zipCode: z
    .string()
    .regex(/^[0-9]{4,10}$/, 'Código postal inválido'),
  
  // Método de pago
  paymentMethod: z.enum(['credit_card', 'debit_card', 'paypal'], {
    message: 'Selecciona un método de pago',
  }),
  
  // Términos y condiciones
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;
