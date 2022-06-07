import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Swiper from 'react-native-swiper/src';

const CustomSwiper = () => {
  return (  
    <View style={styles.sliderContainer}>
      <Swiper
        autoplay
        horizontal={true}
        height={200}
        activeDotColor="#FF6347">
        <View style={styles.slide}>
          <Image
            source={require('../../assets/banners/swiper1.png')}
            resizeMode="cover"
            style={styles.slideImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/banners/swiper2.png')}
            resizeMode="cover"
            style={styles.slideImage}
          />
        </View>
        <View style={styles.slide}>
          <Image
            source={require('../../assets/banners/swiper3.png')}
            resizeMode="cover"
            style={styles.slideImage}
          />
        </View>
      </Swiper>
    </View>
  )
}

export default CustomSwiper;

const styles = StyleSheet.create({
  sliderContainer: {
    height: 200,
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  slideImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
});