import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'patient' | 'practitioner' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  prakriti?: 'vata' | 'pitta' | 'kapha' | 'mixed';
  onboardingComplete?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
  demoLogin: (role: UserRole) => void;
}

// Demo users for quick access
const demoUsers: Record<UserRole, User> = {
  patient: {
    id: 'patient-1',
    email: 'patient@demo.com',
    name: 'Priya Sharma',
    role: 'patient',
    phone: '+91 98765 43210',
    dateOfBirth: '1992-05-15',
    prakriti: 'vata',
    onboardingComplete: true,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9eedf1a?w=150'
  },
  practitioner: {
    id: 'prac-1',
    email: 'practitioner@demo.com',
    name: 'Dr. Rajesh Gupta',
    role: 'practitioner',
    phone: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150'
  },
  admin: {
    id: 'admin-1',
    email: 'admin@demo.com',
    name: 'Admin User',
    role: 'admin',
    phone: '+91 98765 43212',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  }
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication logic
        const user = Object.values(demoUsers).find(u => u.email === email);
        
        if (user && password === 'demo123') {
          set({ user, isAuthenticated: true, isLoading: false });
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      register: async (email: string, password: string, name: string, role: UserRole) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const newUser: User = {
          id: `${role}-${Date.now()}`,
          email,
          name,
          role,
          onboardingComplete: role !== 'patient'
        };
        
        set({ user: newUser, isAuthenticated: true, isLoading: false });
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...updates } });
        }
      },

      demoLogin: (role: UserRole) => {
        const user = demoUsers[role];
        set({ user, isAuthenticated: true });
      }
    }),
    {
      name: 'ayursutra-auth',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);