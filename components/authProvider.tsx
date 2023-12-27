import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/initSupabase';
import { useRouter } from 'next/router';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setAuthenticated] = useState<any>(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setAuthenticated(!!data.session);
      setUser(data.session?.user || null);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      console.log('setting loading false');
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(session?.user ? true : false);
      setUser(session?.user || null);
    });
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      isLoading,
      checkUser,
    }),
    [user, isLoading, isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
