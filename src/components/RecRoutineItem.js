import React from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const RecRoutineItem = ({item}) => {
  return (
    <ImageBackground
      source={item.image}
      style={styles.discoverItem}
      imageStyle={styles.discoverItemImage}>
      <Text style={styles.discoverItemTitle}>{item.title}</Text>
      <View style={styles.discoverItemLocationWrapper}>
        <Entypo name="location-pin" size={18} color={'white'} />
        <Text style={styles.discoverItemLocationText}>{item.location}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  discoverItem: {
    width: 170,
    height: 250,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
  },
  discoverItemImage: {
    borderRadius: 20,
  },
  discoverItemTitle: {
    fontSize: 18,
    color: 'white',
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