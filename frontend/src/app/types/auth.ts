import { User } from 'firebase/auth';

export interface AuthFormData {
  email: string;
  password: string;
  fullName?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (data: AuthFormData) => Promise<void>;
  signUp: (data: AuthFormData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}