import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../types/register';
import { toast } from 'react-hot-toast';
import PasswordStrength from '../../components/PasswordStrength';

export const Route = createFileRoute('/register/')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {},
  });
  const usernameValue = useWatch({ control, name: 'username' });
  const emailValue = useWatch({ control, name: 'email' });
  const password = useWatch({ control, name: 'password' });
  const confirmPasswordValue = useWatch({ control, name: 'confirmPassword' });

  const isFieldValid = (name: keyof RegisterFormData) => {
    switch (name) {
      case 'username':
        return !errors.username && !!usernameValue;
      case 'email':
        return !errors.email && !!emailValue;
      case 'password':
        return !errors.password && !!password;
      case 'confirmPassword':
        return !errors.confirmPassword && !!confirmPasswordValue;
      default:
        return false;
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Datos del registro:', data);
    toast.success('¡Registro realizado con éxito! Gracias por registrarte.');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate({ to: '/' });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Registrarse
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de usuario *
                  </label>
                  <input
                    {...register('username')}
                    type="text"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.username ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="usuariojuan"
                  />
                  {isFieldValid('username') && (
                    <span className="absolute right-3 top-8 text-green-500">✔</span>
                  )}
                  {errors.username && (
                    <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="juan@example.com"
                  />
                  {isFieldValid('email') && (
                    <span className="absolute right-3 top-8 text-green-500">✔</span>
                  )}
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña *
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {isFieldValid('password') && (
                    <span className="absolute right-3 top-8 text-green-500">✔</span>
                  )}

                  <PasswordStrength password={password} />

                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar contraseña *
                  </label>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  {isFieldValid('confirmPassword') && (
                    <span className="absolute right-3 top-8 text-green-500">✔</span>
                  )}
                  {errors.confirmPassword && (
                    <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  {...register('receiveNewsletter')}
                  type="checkbox"
                  className="w-5 h-5 text-blue-600 mt-0.5"
                />
                <span className="text-gray-700">
                  Acepto recibir novedades
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Procesando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
