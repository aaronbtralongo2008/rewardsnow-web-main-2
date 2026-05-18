import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API } from '../config';

const AuthContext = createContext(null);

const TOKEN_KEY = '@rewardsnow_token';
const CUSTOMER_KEY = '@rewardsnow_customer';

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      const [token, raw] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(CUSTOMER_KEY),
      ]);

      if (!token || !raw) {
        setLoading(false);
        return;
      }

      // Validate the saved token is still good
      const res = await fetch(`${API}/customers/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const freshData = await res.json();
        const saved = JSON.parse(raw);
        setCustomer({ ...saved, ...freshData, token });
      } else {
        await clearStorage();
      }
    } catch {
      await clearStorage();
    } finally {
      setLoading(false);
    }
  }

  async function login(data) {
    await AsyncStorage.setItem(TOKEN_KEY, data.token);
    await AsyncStorage.setItem(CUSTOMER_KEY, JSON.stringify(data));
    setCustomer(data);
  }

  async function logout() {
    await clearStorage();
    setCustomer(null);
  }

  async function clearStorage() {
    await AsyncStorage.multiRemove([TOKEN_KEY, CUSTOMER_KEY]);
  }

  return (
    <AuthContext.Provider value={{ customer, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
