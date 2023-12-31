// AuthContext.js
'use client';
import { createContext, useContext, useEffect, useState } from 'react';

import { redirect, usePathname, useRouter } from 'next/navigation';
import path from 'path';
import Cookies from 'js-cookie';
import axiosInstance from './API/Base';
export const AuthContext = createContext({});

export const AuthProvider = ({
  children,
  admin,
  programmer,
  company,
  recruiter,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [state, setState] = useState(() => {
    const storedState = window.localStorage.getItem('authState');
    return storedState
      ? JSON.parse(storedState)
      : { isAuthenticated: false, role: '', session: null };
  });
  const [loggedInUser, setLoggedInUser] = useState({});
  console.log(pathname);

  useEffect(() => {
    window.localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const login = (role, session) => {
    setState({ isAuthenticated: true, role, session });
  };

  const logout = () => {
    // Cookies.set('connect.sid', null);
    Cookies.remove('connect.sid');
    setState({ isAuthenticated: false, role: '', session: null });
    // router.push('/');
  };

  const sessionCookie = Cookies.get('connect.sid')
    ? Cookies.get('connect.sid')
    : null;

  useEffect(() => {
    if (!state?.session || !state?.isAuthenticated) {
      // Redirect to login page after logout
      //  // Redirect to login page after logout
      if (pathname !== '/' && pathname !== '/SignUp') {
        router.push('/');
      }
    }
  }, [state, router, pathname]);

  useEffect(() => {
    const currentUser = async () => {
      try {
        if (state.session.email) {
          const response = await axiosInstance.get(
            `/auth/get-user/${state.session?.email}`,
            {
              headers: {
                Cookie: `connect.sid=${sessionCookie}`,
                'Content-Type': 'application/json',
              },
            },
          );
          setLoggedInUser({ ...response?.data, state });
        }
      } catch (error) {
        console.error('Error fetching current user:', error.message);
      }
    };

    currentUser();
  }, [state?.isAuthenticated, state, sessionCookie]);

  console.log({ 'getting backend daata': loggedInUser });
  return (
    <AuthContext.Provider value={{ ...state, login, logout, loggedInUser }}>
      {!state.isAuthenticated && children}
      {state.role === 'admin' && state.isAuthenticated && admin}
      {state.role === 'programmer' && state.isAuthenticated && programmer}
      {state.role === 'company' && state.isAuthenticated && company}
      {state.role === 'recruiter' && state.isAuthenticated && recruiter}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
