import React from 'react';
import {fireEvent, render, screen, act, waitFor} from '@testing-library/react-native';
import SignInScreen from '../src/screens/Authentication/SignInScreen';
import AuthProvider from '../context/AuthProvider';

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

let output = {};
const mockSignIn = jest.fn(data => output = data);

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

  test('renders signin button', () => {
    const signinButton = screen.getByTestId('signinButton');
    expect(signinButton).toBeTruthy();
  })

  test('updates email input field', async () => {
    fireEvent.changeText(screen.getByTestId('emailInput'), userObject.email);
    expect(screen.getByTestId('emailInput').props.value).toEqual(userObject.email);
  });

  test('updates password input field', async () => {
    fireEvent.changeText(screen.getByTestId('pwdInput'), userObject.password);
    expect(screen.getByTestId('pwdInput').props.value).toEqual(userObject.password);
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
