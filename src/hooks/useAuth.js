import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

let globalUser = null;
let globalLoading = true;
const listeners = new Set();
let authMock = null;

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};
const setGlobalUser = (user) => {
  globalUser = user;
  notifyListeners();
};

export function __setAuthMock(mock) {
  authMock = mock;
}

(async () => {
  try {
    if (apiClient.getToken()) {
      const data = await apiClient.getProfile();
      globalUser = data;
    }
  } catch (error) {
    console.error('Auth check failed:', error);
    apiClient.removeToken();
  } finally {
    globalLoading = false;
    notifyListeners();
  }
})();

export function useAuth() {
  const [user, setUser] = useState(globalUser);
  const [loading, setLoading] = useState(globalLoading);

  useEffect(() => {
    const listener = () => {
      setUser(globalUser);
      setLoading(globalLoading);
    };

    listeners.add(listener);
    return () => listeners.delete(listener);
  }, []);

  const register = async (email, password) => {
    try {
      const data = await apiClient.register(email, password);
      setGlobalUser(data.user);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const login = async (email, password) => {
    try {
      const data = await apiClient.login(email, password);
      setGlobalUser(data.user);
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    apiClient.logout();
    setGlobalUser(null);
  };

  const value = { user, loading, register, login, logout };

  if (authMock) {
    return { ...value, ...authMock };
  }

  return value;
}
