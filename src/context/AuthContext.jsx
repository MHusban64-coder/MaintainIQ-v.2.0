import { createContext, useEffect, useMemo, useState } from 'react';
import { browserLocalPersistence, createUserWithEmailAndPassword, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { createUserProfile, getUserProfile } from '../services/userService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(() => undefined);
    return onAuthStateChanged(auth, async (nextUser) => {
      setUser(nextUser);
      if (nextUser) {
        try { setProfile(await getUserProfile(nextUser.uid)); } catch { setProfile(null); }
      } else setProfile(null);
      setLoading(false);
    });
  }, []);

  const value = useMemo(() => ({
    user, profile, loading,
    refreshProfile: async () => setProfile(await getUserProfile(auth.currentUser.uid)),
    login: (email, password) => signInWithEmailAndPassword(auth, email, password),
    register: async (name, email, password) => {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName: name.trim() });
      const nextProfile = await createUserProfile(credential.user, name);
      setProfile(nextProfile);
      return credential;
    },
    logout: () => signOut(auth),
  }), [user, profile, loading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
