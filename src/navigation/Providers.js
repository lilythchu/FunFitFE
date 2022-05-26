import React from 'react';
import Routes from './Routes';
import AuthProvider from '../../context/AuthProvider';

const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default Providers;