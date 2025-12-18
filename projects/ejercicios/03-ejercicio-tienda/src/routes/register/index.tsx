import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '../../types/register';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Usuario registrado:', data);
    reset();
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Registro
      </h1>

      {isSubmitSuccessful && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
          ¡Registro exitoso!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Usuario */}
        <div>
          <label className="block font-medium mb-1">Usuario</label>
          <input
            {...register('username')}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-red-600 text-sm">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium mb-1">Contraseña</label>
          <input
            type="password"
            {...register('password')}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-600 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block font-medium mb-1">
            Confirmar Contraseña
          </label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-600 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            {...register('acceptNews')}
          />
          <span className="text-sm text-gray-600">
            Acepto recibir novedades
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
}