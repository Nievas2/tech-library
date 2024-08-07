import { useFavoriteStore } from '@/stores';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id       : string;
  username : string;
  email    : string;
  role     : string;
}

export interface AuthUser {
  user  : User;
  token : string;
}

interface AuthContextType {
  authUser    : AuthUser | null;
  setAuthUser : (user: AuthUser | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const storedUser = localStorage.getItem("library-user");
  const [authUser, setAuthUser] = useState<AuthUser | null>(storedUser ? JSON.parse(storedUser) : null);

  const { setUserFavorites } = useFavoriteStore();

  useEffect(() => {
    if (authUser) {
      const storedFavorites = JSON.parse(localStorage.getItem(`favorites-${authUser.user.id}`) || '[]');
      setUserFavorites(authUser.user.id, storedFavorites);
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};