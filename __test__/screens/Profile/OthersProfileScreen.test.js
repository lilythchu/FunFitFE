import React from 'react';
import {render, screen} from '@testing-library/react-native';
import OthersProfileScreen from '../../../src/screens/Core/Profile/OthersProfileScreen';

const mockedNavigate = jest.fn();
const mockInfo = {
  name: 'friendName',
  workoutInterests: ['yoga'],
  age: '20',
  points: 0,
  level: 1,
}

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
    useRoute: () => ({
      params: {
        info: mockInfo,
        token: 'token'
      }
    }),
  };
});

describe('Other Profile screen', () => {
  test('renders correctly', () => {
    render(<OthersProfileScreen />);
    expect(screen).toMatchSnapshot();
  })
})