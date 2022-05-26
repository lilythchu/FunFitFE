import React from 'react';
import {View, Text, StyleSheet, StatusBar, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { LinearGradient } from 'expo-linear-gradient';

const data = [
  {
    title: 'Welcome to FUNFIT',
    text: '',
    image: require('../../assets/images/Onboard1.png'),
  },
  {
    title: 'Enjoy your journey with us',
    text: '',
    image: require('../../assets/images/Onboard2.png'),
  },
  {
    title: "Let's get started",
    text: '',
    image: require('../../assets/images/Onboard3.png'),
  },
];

const OnboardingScreen = (props) => {
  const renderItem = ({item}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item.title;

  const renderNextButton = () => {
    return (
      <View style={styles.rightTextWrapper}>
        <Text style={styles.rightText}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <LinearGradient
        colors={['#A5C8FF', '#23286B']}
        style={styles.linearGradient}
        start={{x: 0, y: 0.5}}
        end={{x: 1, y: 0.5}}
        style={styles.doneButtonWrapper}>
        <Text style={styles.doneButtonText}>Done</Text>
      </LinearGradient>
    );
  };

  const renderPrevButton = () => {
    return (
      <View style={styles.leftTextWrapper}>
        <Text style={styles.leftText}>Prev</Text>
      </View>
    );
  };

  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate('SignIn');
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar translucent backgroundColor="transparent" />
      <AppIntroSlider
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        data={data}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        renderPrevButton={renderPrevButton}
        showPrevButton
        onDone={handleDone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 350,
    height: 350,
    marginVertical: 60,
  },
  title: {
    fontSize: 24,
    color: 'black',
    textAlign: 'center',
    //fontFamily: 'OpenSans-Bold',
    marginHorizontal: 60,
  },
  text: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    //fontFamily: 'OpenSans-SemiBold',
    marginHorizontal: 60,
    marginTop: 20,

  },
  dotStyle: {
    backgroundColor: '#8d8fad',
  },
  activeDotStyle: {
    backgroundColor: '#1c215d',
  },
  rightTextWrapper: {
    width: 40,
    height: 40,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  rightText: {
    color: '#1c215d',
    //fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  leftTextWrapper: {
    width: 40,
    height: 40,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  leftText: {
    color: '#1c215d',
    //fontFamily: 'OpenSans-SemiBold',
    fontSize: 14,
  },
  doneButtonWrapper: {
    flex: 1,
    paddingLeft: 25,
    paddingRight: 25,
    paddingVertical: 10,
    borderRadius: 25,
  },
  doneButtonText: {
    fontSize: 14,
    //fontFamily: 'OpenSans-SemiBold',
    textAlign: 'center',
    alignItems: 'center',
    color: 'white',
  },
});

export default OnboardingScreen;