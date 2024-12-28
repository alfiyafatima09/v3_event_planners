import { User as FirebaseUser } from 'firebase/auth';

export interface AuthFormData {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: FirebaseUser | null;  // Use Firebase's User type
  loading: boolean;
  error: string | null;
  signIn: (data: AuthFormData) => Promise<void>;
  signUp: (data: AuthFormData) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}