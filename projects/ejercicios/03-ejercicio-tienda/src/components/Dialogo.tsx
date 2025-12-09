import { CircleX } from "lucide-react";
import type { ReactNode } from "react";

interface DialogoProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

export function Dialogo({ open, onClose, children }: DialogoProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl relative">
                <CircleX 
                    onClick={onClose}
                    className="w-6 h-6 absolute top-4 right-4 text-gray-600 hover:text-red-500 cursor-pointer"
                />

                <div className="mt-4">
                    {children}
                </div>
            </div>
        </div>
    )
}