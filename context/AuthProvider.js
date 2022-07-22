import React, {createContext, useContext, useState} from 'react';
import jwt_decode from 'jwt-decode';
import client from '../api/client'
const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({});
  const [token, setToken] = useState();
  const [refreshToken, setRefreshToken] = useState(); 

  const isTokenExpired = (token) => {
    var decoded = jwt_decode(token);
    return !(decoded.exp < Date.now() / 1000);
  } 

  const getRefreshedToken = (refreshToken) => {
    client
    .post('/user/refreshToken', {
      refreshToken: refreshToken
    })
    .then(res => {
      console.log(res.data.token)
      console.log(refreshToken)
      setToken(res.data.token);
      return token; 
    })
    .catch(error => {
      console.log("ERRORR")
      setToken(null);
      setRefreshToken(null);
      Alert.alert("Invalid refresh token");
      return null; 
    })
  }

  const getVerifiedToken = (refreshToken) => {  
    if (!isTokenExpired(token)) {
      console.log('here')
      return token
    } else {
      getRefreshedToken(refreshToken);   
    }
  }

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
        getVerifiedToken
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useLogin = () => useContext(AuthContext);

export default AuthProvider;
