import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import RecCard from '../../../src/components/Home/RecCard';

const item = {
  name: 'name',
  description: 'description',
  thumbnail: 'url',
};

const mockNavigation = {
  navigate: jest.fn()
};

describe('Rec card', () => {
  beforeEach(() => {
    render(
      <RecCard item={item} navigation={mockNavigation} />
    )
  })
  test('renders rec card correctly', () => {
    expect(screen.getByTestId('recName').props.children).toEqual('name');
    expect(screen.getByTestId('recDes').props.children).toEqual('description');
  })
  
  test('navigate to Details screen', () => {
    fireEvent.press(screen.getByTestId('nav'));
    expect(mockNavigation.navigate).toBeCalledWith('Details', {item, type: "pair"});
  })
})