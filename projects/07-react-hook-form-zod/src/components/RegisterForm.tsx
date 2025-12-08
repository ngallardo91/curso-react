import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Simulación de emails ya registrados
const existingEmails = ["test@example.com", "admin@example.com", "user@test.com"];

// Función para simular validación asíncrona en servidor
const checkEmailExists = async (email: string): Promise<boolean> => {
  // Simular delay de red
  await new Promise((resolve) => setTimeout(resolve, 500));
  return existingEmails.includes(email.toLowerCase());
};

const schema = z
  .object({
    name: z.string().min(1, "El nombre es obligatorio"),
    email: z
      .email({ message: "Email inválido" })
      .min(1, "El email es obligatorio")
      // Validación asíncrona con superRefine
      .superRefine(async (email, ctx) => {
        const exists = await checkEmailExists(email);
        if (exists) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Este email ya está registrado",
          });
        }
      }),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[^a-zA-Z0-9]/, "Debe contener al menos un carácter especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onBlur", // Validar cuando el usuario sale del campo
  });

  // Observar el valor de la contraseña en tiempo real
  const password = watch("password");   

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

  const onSubmit = async (data: FormData) => {
    // Simular llamada a API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Datos enviados:", data);
    alert("Registro exitoso");
    reset(); // Resetear el formulario después del envío exitoso
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h2>
          <p className="text-blue-100">Completa el formulario para registrarte</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 text-left">
              Nombre completo
            </label>
            <input
              {...register("name")}
              placeholder="Ingresa tu nombre"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 text-left"
            />
            {errors.name && (
              <p className="text-red-600 text-sm font-medium flex items-center gap-1 text-left mt-1">
                {errors.name.message}
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
            <p className="text-xs text-gray-500 text-left">
              💡 Prueba con: test@example.com (ya registrado)
            </p>
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
  );
}
