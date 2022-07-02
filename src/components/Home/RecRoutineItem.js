import React from 'react';
import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import globalColors from '../../../styles/colors';

const RecRoutineItem = ({navigation, item}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {item})}
      style={styles.container}>
      <ImageBackground
        source={{uri: item.thumbnail}}
        style={styles.discoverItem}
        imageStyle={styles.discoverItemImage}
      />
      <Text style={styles.discoverItemTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    padding: 5,
    borderRadius: 15,
    backgroundColor: globalColors.cream,
  },
  discoverItem: {
    width: 196,
    height: 110,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  discoverItemImage: {
    borderRadius: 20,
  },
  discoverItemTitle: {
    padding: 10,
    paddingBottom: 5,
    fontSize: 14,
    color: 'black',
    width: 196,
    fontWeight: '500',
  },
  discoverItemLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  discoverItemLocationText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'white',
  },
});

export default RecRoutineItem;
