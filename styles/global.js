import {StyleSheet, Platform} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: windowWidth - 50,
    height: windowHeight - 300,
    borderRadius: 20,
    padding: 20,
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
  imageBackground: {
    height: windowHeight * 0.6,
    justifyContent: 'space-between',
  },
  scrollView: {
    backgroundColor: 'white',
    padding: 20,
  },
  root: {
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0e86d4',
    margin: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  activityIdicator: {
    padding: 25,
    color: 'black',
  },
  textLinkContainer: {
    padding: 10,
    alignItems: 'center',
  },
  cardInfoContainer: {
    borderRadius: 10,
    marginTop: 10,
    padding: 5,
  },
  recItem: {
    height: 250,
    justifyContent: 'flex-end',
    width: windowWidth/2 - 40,
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
  },
  cardContainer: {
    width: windowWidth/2 - 25,
    marginVertical: 5,
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  myRoutineItemContainer: {
    marginVertical: 15,
    width: windowWidth/2 - 30,
  },
  myRoutineItem: {
    height: windowWidth/2 - 40,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  backIcon: {
    marginLeft: 20,
    marginTop: 60,
  },
  genreWrapper: {
    width: windowWidth/2,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});
