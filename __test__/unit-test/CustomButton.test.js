import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import CustomButton from '../../src/components/CustomButton';

describe('Custom Button', () => {
  test('renders button correctly', () => {
    render(<CustomButton />)
    expect(screen).toMatchSnapshot();
  });

  test('call onPress', async () => {
    const onPress = jest.fn();
    const testID = 'customButton';
    const {getByTestId} = render(
      <CustomButton onPress={onPress} testID={testID}/>
    )

    const button = getByTestId('customButton');
    fireEvent.press(button);
    
    expect(onPress).toHaveBeenCalled();
  })
});