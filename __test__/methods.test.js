import {arrayToSteps, arrayToString, arrayToTime, arrayToSum, firstLetterofName} from '../utils/methods';

describe('Testing methods', () => {
  test('array of genres to strings', () => {
    expect(arrayToString(['yoga', 'cardio', 'pilates'])).toBe('yoga, cardio, pilates');
    expect(arrayToString([])).toBe('');
    expect(arrayToString()).toBe('Oops');
  });

  test('array of numbers to time string', () => {
    expect(arrayToTime([0, 10, 0])).toBe('0 : 10 : 0');
  });

  test('array of time to remaining seconds', () => {
    expect(arrayToSum([0, 20, 0])).toBe(1200);
  });

  test('first letter of given name', () => {
    expect(firstLetterofName('lily')).toBe('L');
    expect(firstLetterofName('  lily')).toBe('L');
    expect(firstLetterofName('')).toBe('User');
    expect(firstLetterofName()).toBe('User');
    expect(firstLetterofName(10)).toBe('User');
  })
})
