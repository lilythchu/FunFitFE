import React, {createContext, useContext, useState} from 'react';
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState(); 

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        profile,
        setProfile,
        token,
        setToken,
        refreshToken, 
        setRefreshToken,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => useContext(AuthContext);

export default AuthProvider;
