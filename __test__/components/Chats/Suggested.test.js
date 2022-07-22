import React from 'react';
import {render, screen} from '@testing-library/react-native';
import Suggested from '../../../src/components/Chats/Suggested';

describe('Suggested friends', () => {
  test('renders correctly', () => {
    render(<Suggested />);
    expect(screen).toMatchSnapshot();
  })
})