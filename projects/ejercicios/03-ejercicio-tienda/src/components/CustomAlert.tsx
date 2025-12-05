export interface CustomAlertProps {
  color?: "green" | "red" | "blue" | "purple";
  description?: string;
  error?: boolean;
}

const colorVariants = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500"
}

export function CustomAlert({ color = "blue", description = "Hecho...", error = false }: CustomAlertProps) {
    if (!error) {
        return (
            <div className={`fixed top-6 right-6 ${colorVariants[color]} text-white px-5 py-3 rounded-lg shadow-lg animate-fadeIn z-50`}>
                {description}
            </div>
        )
    } else {
        return (
            <div className={`fixed top-6 ${colorVariants[color]} text-white px-5 py-3 rounded-lg shadow-lg animate-fadeIn z-50`}>
                {description}
            </div>
        )
    }
}