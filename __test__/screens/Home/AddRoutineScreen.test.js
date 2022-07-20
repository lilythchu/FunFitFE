import React from 'react';
import {render, screen} from '@testing-library/react-native';
import AuthProvider from '../../../context/AuthProvider';
import AddRoutineScreen from '../../../src/screens/Core/Home/AddRoutineScreen';

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

describe('Add routine screen', () => {
  test('renders correctly', () => {
    render(
      <AuthProvider>
        <AddRoutineScreen />
      </AuthProvider>
    );
    expect(screen).toMatchSnapshot();
  })
})