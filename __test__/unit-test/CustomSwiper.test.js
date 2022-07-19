import React from 'react';
import {render, screen} from '@testing-library/react-native';
import CustomSwiper from '../../src/components/CustomSwiper';

describe('Swiper', () => {
  test('renders swiper correctly', () => {
    render(<CustomSwiper />);
    expect(screen).toMatchSnapshot();
  })
})