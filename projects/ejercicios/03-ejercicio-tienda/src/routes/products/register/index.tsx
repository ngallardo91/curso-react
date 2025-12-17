import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '../../../types/register';
import type { RegisterFormValues } from '../../../types/register';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptNews: false,
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    // Simulate API submit
    console.log('Register data:', data);
    setTimeout(() => reset(), 1000);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Crear Cuenta</h2>

      {isSubmitSuccessful && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          ¡Registro exitoso!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-xl">
        <div className="flex flex-col">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input id="username" type="text" {...register('username')} className="p-2 border rounded-md" />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email:</label>
          <input id="email" type="email" {...register('email')} className="p-2 border rounded-md" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Contraseña:</label>
          <input id="password" type="password" {...register('password')} className="p-2 border rounded-md" />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input id="confirmPassword" type="password" {...register('confirmPassword')} className="p-2 border rounded-md" />
          {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <input id="acceptNews" type="checkbox" {...register('acceptNews')} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
          <label htmlFor="acceptNews" className="text-sm">Acepto recibir novedades</label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}

// Note: This file exports a default React component. If you use file-based routes with @tanstack/react-router
// and expect a `Route` export, we can add the route export to integrate with your router. I kept this file
// as a plain component to avoid introducing routing-specific compile errors while we fix other files.
