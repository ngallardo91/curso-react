import { UserRound } from "lucide-react";
import type { User } from "../types/auth.types";
import { useEffect, useRef, useState } from "react";

interface UserMenuProps {
    user: User,
    onLogout: () => void
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
    const [open, setOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false)
        }
        
        document.addEventListener("pointerdown", handleClickOutside)
        document.addEventListener("keydown", handleKeyDown)

        return () => {
            document.removeEventListener("pointerdown", handleClickOutside)
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [open])

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setOpen((v: boolean) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition"
            >
                <UserRound /> {user.userName}
            </button>
            {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border py-2 z-50">
                    <p className="px-4 py-2 text-sm text-gray-700">
                        {user.email}
                    </p>
                    <button
                        onClick={onLogout}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600"
                    >
                        Cerrar Sesión
                    </button>

                </div>
            )}
        </div>
    )
}