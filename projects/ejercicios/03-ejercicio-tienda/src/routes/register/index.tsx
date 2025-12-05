import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerSchema,
  type RegisterFormData,
} from '../../types/register';
import { useState } from 'react';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
});

function getPasswordStrength(password: string) {
  if (!password) {
    return {
      label: '',
      width: '0%',
      barClass: 'bg-transparent',
      textClass: 'text-gray-500',
    };
  }

  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  let label = 'Débil';
  let width = '25%';
  let barClass = 'bg-red-500';
  let textClass = 'text-red-500';

  if (score >= 4) {
    label = 'Fuerte';
    width = '100%';
    barClass = 'bg-emerald-500';
    textClass = 'text-emerald-500';
  } else if (score === 3) {
    label = 'Media';
    width = '75%';
    barClass = 'bg-yellow-500';
    textClass = 'text-yellow-500';
  } else if (score === 2) {
    label = 'Débil';
    width = '50%';
    barClass = 'bg-orange-500';
    textClass = 'text-orange-500';
  }

  return { label, width, barClass, textClass };
}

function RegisterComponent() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      acceptNewsletter: false,
    },
  });

  const passwordValue = watch('password') || '';
  const strength = getPasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Registro enviado:', data);
    setSuccessMessage('¡Tu cuenta fue creada exitosamente!');
    reset();
    setTimeout(() => {
      setSuccessMessage('');
      navigate({ to: '/' });
    }, 2000);
  };

  return (
    <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 border border-gray-100 dark:border-gray-800">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Crear cuenta
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Regístrate para guardar tus datos y mejorar tu experiencia de compra.
      </p>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Nombre de usuario
          </label>
          <input
            type="text"
            {...register('username')}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ej: mati_dev"
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            {...register('email')}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tucorreo@ejemplo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            {...register('password')}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mínimo 8 caracteres"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}

          {passwordValue && (
            <div className="mt-2">
              <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${strength.barClass} transition-all duration-300`}
                  style={{ width: strength.width }}
                />
              </div>
              <p className={`mt-1 text-xs font-medium ${strength.textClass}`}>
                Fortaleza: {strength.label}
              </p>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Confirmar contraseña
          </label>
          <input
            type="password"
            {...register('confirmPassword')}
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Repite tu contraseña"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="acceptNewsletter"
            {...register('acceptNewsletter')}
            className="h-4 w-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
          />
          <label
            htmlFor="acceptNewsletter"
            className="text-sm text-gray-700 dark:text-gray-200"
          >
            Acepto recibir novedades y promociones por correo
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center items-center px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          {isSubmitting ? 'Registrando...' : 'Crear cuenta'}
        </button>

        {successMessage && (
          <p className="mt-3 text-center text-green-500 text-sm">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
}
