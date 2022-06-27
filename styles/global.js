import {StyleSheet, Platform} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';
import globalColors from './colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: windowWidth - 50,
    maxHeight: windowHeight - 300,
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
    marginBottom: 30,
  },
  cardInfoContainer: {
    borderRadius: 10,
    padding: 10, 
    backgroundColor: globalColors.cream,
    flex: 1,
  },
  recItem: {
    justifyContent: 'flex-end',
    flex: 2,
  },
  cardContainer: {
    height: windowHeight * 0.4,
    marginVertical: 5,
    borderRadius: 20,
    padding: 5,
    borderWidth: 1,
  },
  myRoutineItemContainer: {
    marginVertical: 15,
    width: windowWidth/2 - 30,
  },
  myRoutineItem: {
    height: windowWidth/2 - 40,
    justifyContent: 'flex-end',
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
  roundTitle: {
    backgroundColor: globalColors.cream,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  durationContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default globalStyles;
