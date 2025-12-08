import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, type RegisterFormData } from '../../types/register';
import { mockAuthService } from '../../services/mockAuthService';
import { useState } from 'react';

export const Route = createFileRoute('/login/')({
  component: RegisterComponent,
});

function RegisterComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const navigate = useNavigate();
  const password = watch("password");

  const [backendError, setBackendError] = useState("");

  // Calcular fortaleza de la contraseña
  const getPasswordStrength = (password: string = "") => {
    if (!password) return { level: 0, text: "", color: "" };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { level: strength, text: "Débil", color: "bg-red-500" };
    if (strength <= 3) return { level: strength, text: "Media", color: "bg-yellow-500" };
    return { level: strength, text: "Fuerte", color: "bg-green-500" };
  };

  const passwordStrength = getPasswordStrength(password);
  
  const onSubmit = async (data: RegisterFormData) => {
    setBackendError("");
    // Registrar Usuario
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    const res = await mockAuthService.register({
      userName: data.userName,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    })

    if (!res.success) {
      setBackendError(res.error ?? "Error genérico");
      return
    }
    
    const loginSucces = await mockAuthService.login(data.email, data.password)

    if (!loginSucces) {
      setBackendError("Hubo un problema iniciando sesión después del registro")
      return
    }
    
    navigate({ to: '/' });
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Formulario de Registro
      </h1>
      
      <div className="flex justify-center">
        <div className="w-full max-w-3xl">
          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">

            {backendError && (
              <p className="text-red-600 text-center font-semibold mb-2">
                {backendError}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Juan"
                />
                {errors.firstName && (
                  <p className="text-red-600 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido *
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Pérez"
                />
                {errors.lastName && (
                  <p className="text-red-600 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  Nombre de Usuario
                </label>
                <input
                  {...register("userName")}
                  placeholder="Ingresa el nombre de usuario"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-left"
                />
                {errors.userName && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1 text-left mt-1">
                    {errors.userName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  Correo electrónico
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-left"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1 text-left mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  Contraseña
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-left"
                />
                
                {/* Medidor de fortaleza de contraseña */}
                {password && password.length > 0 && (
                  <div className="space-y-1">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1 flex-1 rounded-full transition-all ${
                            level <= passwordStrength.level
                              ? passwordStrength.color
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-600 text-left">
                      Fortaleza: <span className="font-semibold">{passwordStrength.text}</span>
                    </p>
                  </div>
                )}

                {errors.password && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1 text-left mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 text-left">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Repite tu contraseña"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-left"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm font-medium flex items-center gap-1 text-left mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Registrando...
                </span>
              ) : (
                "Registrarse"
              )}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              ¿Ya tienes cuenta?{" "}
              <a href="#" className="text-blue-500 hover:text-blue-600 font-semibold">
                Inicia sesión
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
