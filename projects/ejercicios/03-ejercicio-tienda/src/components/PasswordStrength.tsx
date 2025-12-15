type PasswordStrengthProps = {
  password?: string;
};

function getPasswordStrength(password: string) {
  let score = 0;

  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score; // 0 - 5
}

const strengthMap = [
  { label: 'Muy débil', color: 'bg-red-500', width: 'w-1/5' },
  { label: 'Débil', color: 'bg-red-500', width: 'w-2/5' },
  { label: 'Media', color: 'bg-yellow-500', width: 'w-3/5' },
  { label: 'Buena', color: 'bg-green-500', width: 'w-4/5' },
  { label: 'Fuerte', color: 'bg-green-600', width: 'w-full' },
];

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const strength = getPasswordStrength(password);
  const { label, color, width } = strengthMap[Math.min(strength, 4)];

  return (
    <div className="mt-2">
      <div className="w-full h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded transition-all duration-300 ${color} ${width}`}
        />
      </div>

      <p className="text-sm mt-1 text-gray-600">
        Seguridad: <span className="font-medium">{label}</span>
      </p>
    </div>
  );
}
