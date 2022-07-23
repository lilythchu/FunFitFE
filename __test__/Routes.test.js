import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Routes from '../src/navigation/Routes';
import AuthProvider, {useLogin} from '../context/AuthProvider';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('../context/AuthProvider', () => {
  const original = jest.requireActual('../context/AuthProvider');
  return {
    ...original,
    useLogin: () => ({
      isLoggedIn: false,
    })
  }
})

describe('Authenticated routes', () => {
  beforeEach(() => {
    render(<Routes />);
  });

  test('should display onboarding screen if user havent logged in', async () => {
    expect(await screen.findByText('Welcome to FUNFIT')).toBeTruthy();
  });

  test('should not display home page if user havent logged in', () => {
    expect(screen.queryByText('Home')).toBeNull();
  })
})