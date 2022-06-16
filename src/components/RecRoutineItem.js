import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import cover from '../../assets/images/australia.png';
import globalColors from '../../styles/colors';

const RecRoutineItem = ({navigation, item}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Details", {item})}
      style={styles.container}
    >
      <ImageBackground
        source={{
          uri: item.thumbnail
        }}
        style={styles.discoverItem}
        imageStyle={styles.discoverItemImage}>
        {/* <View style={styles.discoverItemLocationWrapper}>
          <Entypo name="dumbbell" size={18} color={'white'} />
          <Text style={styles.discoverItemLocationText}>{item.genre}</Text>
        </View> */}
      </ImageBackground>
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
    width: 246,
    height: 138,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  discoverItemImage: {
    borderRadius: 20,
  },
  discoverItemTitle: {
    padding: 10,
    fontSize: 14,
    color: 'black',
    width: 246,
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