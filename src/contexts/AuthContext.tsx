import { auth } from '@/lib/firebase';
import { User, UserCredential } from 'firebase/auth';
import { PropsWithChildren, createContext, useContext } from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';

type AuthContextData = {
  user: User | null | undefined;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, loading, authStateError] = useAuthState(auth);
  const [signInWithGoogle, loggedInUser, isLoggingIn, loginError] =
    useSignInWithGoogle(auth);

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
