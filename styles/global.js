import { StyleSheet} from 'react-native';
import { windowHeight } from '../utils/Dimentions';

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
    color: '#003060',
  },
  logo: {
    width: '70%',
    alignSelf: 'center',
    height: windowHeight * 0.3,
  },
  root: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e86d4',
    margin: 10,
    alignSelf: 'center'
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
});