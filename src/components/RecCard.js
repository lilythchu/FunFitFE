import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { globalStyles } from '../../styles/global';

const RecCard = ({item}) => {
  return (
    <View >
      <ImageBackground
        source={item.image}
        style={globalStyles.recItem}
        imageStyle={styles.discoverItemImage}>
        <Text style={styles.discoverItemTitle}>{item.title}</Text>
      </ImageBackground>

      <View style={globalStyles.cardInfoContainer}>
        <Text numberOfLines={3} style={{textAlign: 'auto'}}>{item.description}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  discoverItemImage: {
    borderRadius: 20,
  },
  discoverItemTitle: {
    fontSize: 18,
    color: 'white',
  },
});

export default RecCard;