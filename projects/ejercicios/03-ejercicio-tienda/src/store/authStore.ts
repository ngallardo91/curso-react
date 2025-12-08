import { create } from "zustand";
import type { AuthState, Role } from "../types/auth.types";
import { persist } from "zustand/middleware";
import { mockAuthService } from "../services/mockAuthService";

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            tokens: null, 
            isAuthenticated: false,

            login: async (email: string, password: string) => {
                const result = await mockAuthService.login(email.trim().toLowerCase(), password)

                if (result) {
                    set({
                        user: result.user,
                        tokens: result.tokens,
                        isAuthenticated: true
                    })
                        
                    return true
                }
 
                return false
            },

            logout: async () => {
                const { tokens } = get()

                if (tokens?.refreshToken) {
                    await mockAuthService.logout(tokens.refreshToken)
                }
                
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                })
            },
            refreshAccessToken: async () => {
                const { tokens } = get()

                if (!tokens?.refreshToken) {
                    return false
                }

                const newTokens = await mockAuthService.refreshToken(tokens.refreshToken)

                if (newTokens) {
                    set({ 
                        tokens: newTokens
                    })

                    return true
                }
                set({
                    user: null,
                    tokens: null,
                    isAuthenticated: false,
                })

                return false
            },
            hasRole: (role: Role | Role[]) => {
                const { user } = get()

                if (!user) return false
                
                return Array.isArray(role) ? role.includes(user.role) : user.role === role
            },
            isTokenExpired: () => {
                const { tokens } = get()

                if (!tokens ) return true

                return Date.now() > tokens.expiresAt - 60 * 1000
                
            }
        }),
        {
            name: "auth-storage"
        }
    )
)