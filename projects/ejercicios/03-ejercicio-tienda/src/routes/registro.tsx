import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { esquemaRegistro, type DatosRegistro } from '../types/registro';

export const Route = createFileRoute('/registro')({
  component: RegistroComponent,
});

function RegistroComponent() {
  const navegar = useNavigate();
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<DatosRegistro>({
    resolver: zodResolver(esquemaRegistro),
    defaultValues: {
      recibirOfertas: false,
      aceptoTerminos: false,
    },
  });

  const clave = watch('clave', '');

  // Indicador de seguridad de contraseña
  const calcularSeguridad = (pass: string): number => {
    let puntos = 0;
    if (pass.length >= 6) puntos++;
    if (pass.length >= 10) puntos++;
    if (/[A-Z]/.test(pass)) puntos++;
    if (/[0-9]/.test(pass)) puntos++;
    if (/[^A-Za-z0-9]/.test(pass)) puntos++;
    return puntos;
  };

  const nivelSeguridad = calcularSeguridad(clave);
  const coloresSeguridad = ['bg-gray-200', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-lime-400', 'bg-green-500'];
  const textosSeguridad = ['', 'Débil', 'Baja', 'Media', 'Buena', 'Excelente'];

  const onSubmit = async (datos: DatosRegistro) => {
    await new Promise((r) => setTimeout(r, 1200));
    console.log('Registro:', datos);
    setRegistroExitoso(true);
    setTimeout(() => navegar({ to: '/' }), 2500);
  };

  if (registroExitoso) {
    return (
      <div className="max-w-md mx-auto text-center py-20">
        <div className="text-7xl mb-4">✅</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Cuenta creada!
        </h2>
        <p className="text-gray-500">
          Serás redirigido en unos segundos...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center">
        Crear una cuenta
      </h1>
      <p className="text-gray-500 text-center mb-8">
        Regístrate para acceder a ofertas exclusivas
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-lg space-y-5">
        {/* Nombre de usuario */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Usuario
          </label>
          <input
            {...register('nombreUsuario')}
            type="text"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
              errors.nombreUsuario ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="tuusuario"
          />
          {errors.nombreUsuario && (
            <p className="text-red-500 text-sm mt-1">{errors.nombreUsuario.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            {...register('correo')}
            type="email"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
              errors.correo ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="tu@correo.com"
          />
          {errors.correo && (
            <p className="text-red-500 text-sm mt-1">{errors.correo.message}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            {...register('clave')}
            type="password"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
              errors.clave ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="••••••••"
          />
          {/* Barra de seguridad */}
          {clave.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div
                    key={n}
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      n <= nivelSeguridad ? coloresSeguridad[nivelSeguridad] : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Seguridad: {textosSeguridad[nivelSeguridad]}
              </p>
            </div>
          )}
          {errors.clave && (
            <p className="text-red-500 text-sm mt-1">{errors.clave.message}</p>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Repetir contraseña
          </label>
          <input
            {...register('confirmarClave')}
            type="password"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition ${
              errors.confirmarClave ? 'border-red-400 bg-red-50' : 'border-gray-200'
            }`}
            placeholder="••••••••"
          />
          {errors.confirmarClave && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmarClave.message}</p>
          )}
        </div>

        {/* Checkbox ofertas */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            {...register('recibirOfertas')}
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded"
          />
          <span className="text-gray-600 text-sm">
            Quiero recibir ofertas y novedades por email
          </span>
        </label>

        {/* Checkbox términos */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            {...register('aceptoTerminos')}
            type="checkbox"
            className="w-4 h-4 text-blue-600 rounded mt-0.5"
          />
          <span className="text-gray-600 text-sm">
            He leído y acepto los términos de uso y política de privacidad
          </span>
        </label>
        {errors.aceptoTerminos && (
          <p className="text-red-500 text-sm -mt-3">{errors.aceptoTerminos.message}</p>
        )}

        {/* Botón submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Creando cuenta...' : 'Crear mi cuenta'}
        </button>

        <p className="text-center text-gray-500 text-sm">
          ¿Ya tienes cuenta?{' '}
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Iniciar sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
