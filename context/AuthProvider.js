import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, profile, setProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => useContext(AuthContext);

export default AuthProvider;