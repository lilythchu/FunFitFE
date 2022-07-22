import React from 'react';
import {render, screen} from '@testing-library/react-native';
import AuthProvider from '../../../context/AuthProvider';
import ChatStoriesScreen from '../../../src/screens/Core/Chats/ChatStoriesScreen';

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

describe('Chats and Stories screen', () => {
  test('renders correctly', () => {
    render(
      <AuthProvider>
        <ChatStoriesScreen />
      </AuthProvider>
    );
    expect(screen).toMatchSnapshot();
  })
})