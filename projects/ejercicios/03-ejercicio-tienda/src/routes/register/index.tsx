import { createFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    registerSchema,
    type RegisterFormData,
  } from '../../types/register';

export const Route = createFileRoute('/register/')({
  component: RegisterPage,
})

function RegisterPage() {
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormData>({
      resolver: zodResolver(registerSchema),
    });
  
    const onSubmit = (data: RegisterFormData) => {
      console.log('Registro enviado:', data);
      alert('Registro exitoso 🎉');
    };
  
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Registro de Usuario
        </h1>
  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
  
          {/* Usuario */}
          <div>
            <input
              type="text"
              placeholder="Usuario"
              {...register('username')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
  
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
  
          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              {...register('password')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
  
          {/* Confirm Password */}
          <div>
            <input
              type="password"
              placeholder="Confirmar contraseña"
              {...register('confirmPassword')}
              className="w-full border rounded px-3 py-2"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
  
          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('acceptNews')}
            />
            <span className="text-sm">
              Acepto recibir novedades
            </span>
          </div>
  
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    );
  }