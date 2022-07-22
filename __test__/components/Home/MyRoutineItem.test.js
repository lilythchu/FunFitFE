import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import MyRoutineItem from '../../../src/components/Home/MyRoutineItem';

const myItem = {
  name: 'my routine',
  genre: ['yoga', 'cardio'],
  duration: ['0', '10', '0'],
  steps: ['First', 'Second'],
  timings: [['0', '20', '0'], ['0', '10', '0']]
};

const item = {
  name: 'my rec',
  genre: ['yoga', 'cardio'],
  description: 'description',
  thumbnail: 'thumbnail',
}

const mockNavigation = {
  navigate: jest.fn()
};

describe('My created routine', () => {
  beforeEach(() => {
    render(
      <MyRoutineItem item={myItem} navigation={mockNavigation} type="created" />
    )
  })
  test('renders correctly', () => {
    expect(screen.getByTestId('myRoutineName').props.children)
      .toEqual('my routine')
    expect(screen.getByTestId('image')).toBeTruthy();
    expect(screen.getByTestId('crudIcon')).toBeTruthy();
  })

  test('show routine details', () => {
    fireEvent.press(screen.getByTestId('routineDetails'));
    expect(screen.getByTestId('details')).toBeTruthy();
  })

})

describe('My routine from rec', () => {
  beforeEach(() => {
    render(
      <MyRoutineItem item={item} navigation={mockNavigation} type="rec" />
    )
  })
  test('renders correctly', () => {
    expect(screen.getByTestId('image')).toBeTruthy();
    expect(screen.getByTestId('crudIcon')).toBeTruthy();
  })

  test('navigate to Details screen', () => {
    fireEvent.press(screen.getByTestId('routineDetails'));
    expect(mockNavigation.navigate).toBeCalledWith('Details', {item});
  })
})