import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import RecRoutines from '../../../src/components/Home/RecRoutines';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYWNjYjI2NDdkYmY4ZjhlMzkzMzg1In0sImlhdCI6MTY1ODMzMjEzOSwiZXhwIjoxNjYxOTMyMTM5fQ.IDs4NjykuWVHDYcrPO6F5MOznfJ4FQdsJxO4nIc7P-w';

const mockNavigation = {
  navigate: jest.fn()
}

describe('Rec routine lists', () => {
  beforeEach(() => {
    render(<RecRoutines token={token} navigation={mockNavigation} />)
  })
  test('render title', () => {
    expect(screen.getByTestId('title')).toBeTruthy();
  })

  // test('should render rec item', async () => {
  //   const recItem = await screen.findAllByTestId('recItem');
  //   expect(recItem.length).toBe(1);
  // })

  test('navigate to rec database', () => {
    fireEvent.press(screen.getByTestId('nav'));
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Recommended', {token})
  })
})