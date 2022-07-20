import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import MyStories from '../../../src/components/Chats/MyStories';

const mockUserInfo = {
  name: 'user1',
  sex: 'Female',
};

const mockNavigation = {
  navigate: jest.fn()
}

const setState = jest.fn();
const useStateSpy = jest.spyOn(React, 'useState');
useStateSpy.mockImplementation(initialState => [initialState,setState]);

describe('My Stories', () => {
  beforeEach(() => {
    render(<MyStories userInfo={mockUserInfo} navigation={mockNavigation} />)
  });

  test('renders correctly', () => {
    expect(screen).toMatchSnapshot();
  });

  // test('navigate to My Story screen if having stories', () => {
  //   fireEvent.press(screen.getByTestId('myStories'));
  //   expect(mockNavigation.navigate).toHaveBeenCalled();
  // })

});
