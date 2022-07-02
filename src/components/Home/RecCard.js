import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import globalStyles from '../../../styles/global';

const RecCard = ({item, navigation}) => {
  return (
    <View style={globalStyles.cardContainer}>
      <ImageBackground
        source={{uri: item.thumbnail}}
        style={globalStyles.recItem}
        imageStyle={styles.ItemImage}
      />

      <View style={globalStyles.cardInfoContainer}>
        <Text style={styles.routineName}>{item.name}</Text>
        <Text numberOfLines={2} style={{textAlign: 'auto'}}>
          {item.description}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Details', {item})}>
          <Text style={[globalStyles.link, {textDecorationLine: 'underline'}]}>
            More
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemImage: {
    borderRadius: 20,
  },
  routineName: {
    fontSize: 14,
    color: 'black',
    fontWeight: '600',
  },
});

export default RecCard;
