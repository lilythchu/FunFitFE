import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import Chevron from '../../src/components/Chevron';

const navigation = {
  goBack: jest.fn()
};

describe('Chevron', () => {
  test('renders chevron correctly', () => {
    render(<Chevron />);
    expect(screen).toMatchSnapshot();
  });

  test('navigate correctly', () => {
    const {getByTestId} = render(<Chevron  navigation={navigation} />)
    fireEvent.press(getByTestId('chevron'));
    expect(navigation.goBack).toHaveBeenCalled();
  })
});