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

const RecRoutineItem = ({navigation, item}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Details", {item})}>
      <ImageBackground
        source={item.thumbnail}
        style={styles.discoverItem}
        imageStyle={styles.discoverItemImage}>
        <Text style={styles.discoverItemTitle}>{item.name}</Text>
        {/* <View style={styles.discoverItemLocationWrapper}>
          <Entypo name="dumbbell" size={18} color={'white'} />
          <Text style={styles.discoverItemLocationText}>{item.genre}</Text>
        </View> */}
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  discoverItem: {
    width: 246,
    height: 138,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
  },
  discoverItemImage: {
    borderRadius: 20,
  },
  discoverItemTitle: {
    fontSize: 14,
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