import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import CustomChip from '../../src/components/CustomChip';

describe('Custom Chip', () => {
  test('renders custom chip correctly', () => {
    render(<CustomChip />);
    expect(screen).toMatchSnapshot();
  });
})