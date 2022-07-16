import {arrayToSteps, arrayToString, arrayToTime, arrayToSum} from "../utils/methods";

test('array of genres to strings', () => {
  expect(arrayToString(['yoga', 'cardio', 'pilates'])).toBe('yoga, cardio, pilates');
});

test('array of numbers to time string', () => {
  expect(arrayToTime([0, 10, 0])).toBe('0 : 10 : 0');
});

test('array of time to remaining seconds', () => {
  expect(arrayToSum([0, 20, 0])).toBe(1200);
});
