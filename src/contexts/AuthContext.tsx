import { auth } from '@/lib/firebase';
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth';
import { PropsWithChildren, createContext, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type AuthContextData = {
  user: User | null | undefined;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, loading] = useAuthState(auth);
  // const [signInWithGoogle] = useSignInWithGoogle(auth);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    return await signInWithPopup(auth, provider);
  };

  const logout = async () => await auth.signOut();

  const value = {
    user,
    loading,
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}
