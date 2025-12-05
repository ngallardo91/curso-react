export interface CustomAlertProps {
  color?: "green" | "red" | "blue";
  description?: string;
}

const colorVariants = {
    green: "bg-green-500",
    red: "bg-red-500",
    blue: "bg-blue-500"
}

export function CustomAlert({ color = "blue", description = "Hecho..." }: CustomAlertProps) {
    return (
        <div className={`fixed top-6 right-6 ${colorVariants[color]} text-white px-5 py-3 rounded-lg shadow-lg animate-fadeIn z-50`}>
            {description}
        </div>
    )
}