import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import Ionic from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation, useRoute} from '@react-navigation/native';

const StoryScreen = () => {
  const navigation = useNavigation();
  const {item} = useRoute().params;

  useEffect(() => {
    let timer = setTimeout(() => {
      navigation.goBack();
    }, 5000);

    Animated.timing(progress, {
      toValue: 5,
      duration: 5000,
      useNativeDriver: false,
    }).start();
    return () => clearTimeout(timer);
  }, []);

  const [progress, setProgress] = useState(new Animated.Value(0));

  const progressAnimation = progress.interpolate({
    inputRange: [0, 5],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Progress bar */}
      <View style={styles.progressBar}>
        <Animated.View
          style={[styles.barAnimation, {width: progressAnimation}]}
        />
      </View>

      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.userContainer}>
          <View style={styles.userImgContainer}>
            <Image source={item.photo} style={styles.userImg} />
          </View>
          <Text style={styles.userName}>{item.name}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionic name="close" style={{fontSize: 32, color: 'black'}} />
        </TouchableOpacity>
      </View>

      {/* Story Image */}
      <Image source={item.photo} style={styles.storyImg} />

      {/* Emotion */}
      {/* <View style={styles.emotionContainer}>
        <Feather name='heart' />
        <Feather name='heart' />
      </View> */}

      {/* Send Message */}
      <View style={styles.footerContainer}>
        <TextInput
          placeholder="send a message"
          style={styles.textInputContainer}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="navigation" style={{fontSize: 30}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressBar: {
    height: 7,
    width: '98%',
    borderWidth: 1,
    backgroundColor: 'gray',
    borderRadius: 10,
    position: 'absolute',
    top: 50,
  },
  barAnimation: {
    height: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    width: '100%',
    justifyContent: 'space-between',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImgContainer: {
    width: 64,
    height: 64,
  },
  userImg: {
    borderRadius: 100,
    backgroundColor: 'orange',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 24,
    paddingLeft: 10,
  },
  storyImg: {
    position: 'absolute',
    width: '90%',
    height: '40%',
    borderRadius: 20,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '100%',
  },
  textInputContainer: {
    borderRadius: 25,
    width: '85%',
    height: 45,
    paddingLeft: 20,
    borderWidth: 1,
    fontSize: 18,
  },
  emotionContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 100,
  },
});
