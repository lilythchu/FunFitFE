import React from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';

const ListImage = ({image}) => {
  return (
    <View style={{padding: 10}}>
      <Image 
        source={image.photo}
        style={styles.galleryImage}
      />
    </View>
  )
}

const images = [
  {
    id: '1',
    photo: require('../../../assets/images/australia.png')
  },
  {
    id: '2',
    photo: require('../../../assets/images/australia.png')
  },
  {
    id: '3',
    photo: require('../../../assets/images/australia.png')
  },
]

const Achievement = () => {
  return (
    <View style={styles.galleryContainer}>
      <Text style={styles.galleryText}>Achievement</Text>
      <FlatList
        data={images}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => <ListImage image={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  galleryContainer: {
    marginTop: 20,
  },
  galleryText: {
    fontWeight: '400',
    fontSize: 24,
  },
  galleryImage: {
    width: 300,
    height: 200,
    borderRadius: 20,
  },
})

export default Achievement;