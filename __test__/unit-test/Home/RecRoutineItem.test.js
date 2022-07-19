import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import RecRoutineItem from '../../../src/components/Home/RecRoutineItem';

const item = {
  name: 'name',
  thumbnail: 'url',
};

const mockNavigation = {
  navigate: jest.fn()
};

describe('Rec routine item', () => {
  beforeEach(() => {
    render(
      <RecRoutineItem item={item} navigation={mockNavigation} />
    )
  })
  test('renders rec card correctly', () => {
    expect(screen).toMatchSnapshot();
  })
  
  test('navigate to Details screen', () => {
    fireEvent.press(screen.getByTestId('nav'));
    expect(mockNavigation.navigate).toBeCalledWith('Details', {item, type: "pair"});
  })
})