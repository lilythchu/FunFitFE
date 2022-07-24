import React from 'react';
import {fireEvent, render, screen, act, waitFor} from '@testing-library/react-native';
import SignInScreen from '../../../src/screens/Authentication/SignInScreen';
import AuthProvider from '../../../context/AuthProvider';

jest.useFakeTimers();

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  register: jest.fn(),
  handleSubmit: jest.fn(),
}))

const userObject = {
  email: 'lily@gmail.com',
  password: '123456789',
};

describe('Sign In', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <SignInScreen />
      </AuthProvider>
    );
  })

  test('renders Sign in screen correctly', () => {
    expect(screen).toMatchSnapshot();    
  });

  test('should display required error when email and password are invalid', async () => {
    fireEvent.press(screen.getByTestId('signinButton'));
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Password is required')).toBeTruthy();
  })

  test('should display matching error when email is invalid', async () => {
    fireEvent.changeText(screen.getByTestId('emailInput'), 'abc@');
    fireEvent.press(screen.getByTestId('signinButton'));
    expect(screen.getByTestId('emailInput').props.value).toEqual('abc@');
    expect(await screen.findByText('Email is invalid')).toBeTruthy();
  });

  test('should display matching error when password is inavlid', async () => {
    fireEvent.changeText(screen.getByTestId('pwdInput'), '12');
    fireEvent.press(screen.getByTestId('signinButton'));
    expect(screen.getByTestId('pwdInput').props.value).toEqual('12');
    expect(await screen.findByText('Password should be minimum 3 characters long')).toBeTruthy();
  });

  test('navigate to forgot password screen', () => {
    fireEvent.press(screen.getByTestId('forgotPwd'));
    expect(mockedNavigate).toBeCalledWith('ForgotPassword');
  })

  test('navigate to sign up screen', () => {
    fireEvent.press(screen.getByTestId('signup'));
    expect(mockedNavigate).toBeCalledWith('SignUp');
  });  
})
