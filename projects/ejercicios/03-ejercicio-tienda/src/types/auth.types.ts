export type Role = "admin" | "user" | "guest";

export interface User {
    id: string
    userName: string
    email: string
    role: Role
    firstName: string
    lastName: string
}

export interface AuthTokens {
    accessToken: string
    refreshToken: string
    expiresAt: number
}

export interface AuthState {
    user: User | null
    tokens: AuthTokens | null
    isAuthenticated: boolean
    login: (userName: string, password: string) => Promise<boolean>
    logout: () => void
    refreshAccessToken: () => Promise<boolean>
    hasRole: (role: Role | Role[]) => boolean
    isTokenExpired: () => boolean
}