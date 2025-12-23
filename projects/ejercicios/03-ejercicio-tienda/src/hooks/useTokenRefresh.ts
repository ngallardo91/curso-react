import { useAuthStore } from "../store/authStore";
import { useEffect, useRef } from "react";

export const useTokenRefresh = () => {
    const { isAuthenticated, isTokenExpired, refreshAccessToken, logout } = useAuthStore();
    const intervalRef = useRef<number | null> (null);

    useEffect(() => {
        if (!isAuthenticated) {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }

            return;
        }

        const checkAndRefreshToken = async () => {
            if (isTokenExpired()) {
                const success = await refreshAccessToken();
                if (!success) {
                    await logout();
                }
            }
        }

        checkAndRefreshToken();

        intervalRef.current = window.setInterval(checkAndRefreshToken, 5 * 60 * 1000)

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
            }

        }
    }, [isAuthenticated, isTokenExpired, refreshAccessToken, logout])
}