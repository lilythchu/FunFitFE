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
      isLoggedIn: true
    })
  }
})

describe('Test Routes', () => {
  test('renders correctly', () => {
    render(<Routes />);
    expect(screen).toMatchSnapshot();
  })
})