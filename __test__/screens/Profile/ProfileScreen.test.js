import React from 'react';
import {render, screen} from '@testing-library/react-native';
import AuthProvider from '../../../context/AuthProvider';
import ProfileScreen from '../../../src/screens/Core/Profile/ProfileScreen';

const mockedNavigate = jest.fn();
const mockInfo = {
  name: 'friendName',
  workoutInterests: ['yoga'],
  age: '20',
  points: 0,
  level: 1,
}

describe('Profile screen', () => {
  test('renders correctly', () => {
    render(
      <AuthProvider>
        <ProfileScreen/>
      </AuthProvider>
    );
    expect(screen).toMatchSnapshot();
  })
})