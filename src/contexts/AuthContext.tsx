// import { useGetUserProfile } from '@/api/user.api';
import { auth } from '@/lib/firebase';
import { UserProfile } from '@/models/user.model';
import {
  GoogleAuthProvider,
  User,
  UserCredential,
  signInWithPopup,
} from 'firebase/auth';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

type AuthContextData = {
  user: User | null | undefined;
  userProfile: UserProfile | undefined;
  setUserProfile: (profile: UserProfile) => void;
  setProfileLoading: (loading: boolean) => void;
  loading: boolean;
  signInWithGoogle: () => Promise<UserCredential | undefined>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, loading] = useAuthState(auth);
  const [profileLoading, setProfileLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();
  // const [signInWithGoogle] = useSignInWithGoogle(auth);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    return await signInWithPopup(auth, provider);
  };

  const logout = async () => {
    await auth.signOut();
    setUserProfile(undefined);
  };

  const value = {
    user,
    userProfile,
    setUserProfile,
    loading: loading || profileLoading,
    setProfileLoading,
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
