import { StyleSheet, useWindowDimensions } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'pink',
  },
  link: {
    color: '#4867aa',
  },
  logo: {
    width: '70%',
    alignSelf: 'center',
  },
  root: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
});

const colors = StyleSheet.create({
  c1: {
    color: '#4867aa',
  },
});