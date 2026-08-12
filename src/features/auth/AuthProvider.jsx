import React, { createContext, useContext, useState, useEffect } from 'react';
import { userFromAccessToken } from '../../utils/authUser';

export const AuthContext = createContext(null);

const readStoredUser = () => {
  try {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken && refreshToken) {
        setIsAuthenticated(true);
        const storedUser = readStoredUser();
        const nextUser = storedUser?.email
          ? storedUser
          : userFromAccessToken(accessToken);
        if (nextUser) {
          localStorage.setItem('user', JSON.stringify(nextUser));
          setUser(nextUser);
        } else {
          setUser(storedUser);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async ({ accessToken, refreshToken, user: nextUser }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    if (nextUser) {
      localStorage.setItem('user', JSON.stringify(nextUser));
      setUser(nextUser);
    }
    setIsAuthenticated(true);
    return true;
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
