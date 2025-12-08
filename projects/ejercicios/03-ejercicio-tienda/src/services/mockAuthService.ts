import type { AuthTokens, Role, User } from "../types/auth.types";

const LOCAL_KEY = "mock-users";

const baseUsers: Array<User & { password: string }> = [ 
    { 
    id: '1', 
    userName: 'admin', 
    password: 'admin123', 
    email: 'admin@example.com', 
    firstName: 'Administrator', 
    lastName: 'User', 
    role: 'admin', 
  }, 

  { 
    id: '2', 
    userName: 'user', 
    password: 'user123', 
    email: 'user@example.com', 
    firstName: 'Regular', 
    lastName: 'User', 
    role: 'user', 
  }, 

  { 
    id: '3', 
    userName: 'guest', 
    password: 'guest123', 
    email: 'guest@example.com', 
    firstName: 'Guest', 
    lastName: 'User', 
    role: 'guest', 
  }, 
]; 

function loadUsers() {
  const stored = localStorage.getItem(LOCAL_KEY)

  if (!stored) return baseUsers

  try {
    return JSON.parse(stored)
  } catch {
    return baseUsers
  }
}

function saveUsers(users: User & { password: string }) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(users));
}

let mockUsers = loadUsers();

const refreshTokenStore = new Map<string, { userId: string; expiresAt: number }>(); 

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms)); 

const generateTokens = (userId: string): AuthTokens => { 
    const accessToken = `access-token-${userId}-${Date.now()}`
    const refreshToken = `refresh-token-${userId}-${Date.now()}`; 
    const accessTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes 
    const refreshTokenExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days 
    
    refreshTokenStore.set(refreshToken, { userId, expiresAt: refreshTokenExpiry }); 

    return { 
        accessToken, 
        refreshToken, 
        expiresAt: accessTokenExpiry, 
    }; 
} 

export const mockAuthService = { 
  checkEmail: async (email: string) => {
    await delay(500); // Simula latencia de red 

    mockUsers = loadUsers();

    return mockUsers.some( 
      (user: User) => user.email.toLowerCase() === email.toLowerCase()
    ); 
  },

  register: async (payload: {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: Role;
  }) => {
    await delay(500);
    mockUsers = loadUsers();

    const exists = mockUsers.some((user: User & { password: string }) => user.email.toLowerCase() === payload.email.toLowerCase())

    if (exists) {
      return { success: false, error: "Este email ya está registrado"}
    }

    const newUser = {
      ...payload,
      id: String(Date.now()),
      role: payload.role ?? "user"
    }

    mockUsers.push(newUser);
    saveUsers(mockUsers)
    
    return { success: true, user: newUser }
  },

  login: async (email: string, password: string) => { 
    await delay(500); // Simula latencia de red 
    
    mockUsers = loadUsers();

    const user = mockUsers.find( 
      (user: User & { password: string }) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    ); 

    if (!user) return null

    const { password: _, ...userWithoutPassword } = user;
    const tokens = generateTokens(user.id); 

    return { user: userWithoutPassword, tokens }; 
  }, 

  refreshToken: async (refreshToken: string) => { 
    const tokenData = refreshTokenStore.get(refreshToken); 

    if (!tokenData || Date.now() > tokenData.expiresAt) { 
      refreshTokenStore.delete(refreshToken); 
      return null; 
    } 
    const newTokens = generateTokens(tokenData.userId); 
    refreshTokenStore.delete(refreshToken); 
    return newTokens; 
  }, 

  logout: async (refreshToken: string) => { 
    refreshTokenStore.delete(refreshToken); 
  }, 
};