import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import MyRoutines from '../../../src/components/Home/MyRoutines';

const navigation = {
  navigate: jest.fn()
};

describe('My routines', () => {
  beforeEach(() => {
    render(<MyRoutines navigation={navigation} />)
  })

  test('renders correctly', () => {
    expect(screen.getByText('My Routines')).toBeTruthy();
  })

  test('add new routine', () => {
    fireEvent.press(screen.getByTestId('addRoutine'));
    expect(navigation.navigate).toHaveBeenCalledWith('AddRoutine');
  })

  test('should render my routine item', () => {
  })
})