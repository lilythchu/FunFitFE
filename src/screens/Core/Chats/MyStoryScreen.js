import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ActivityIndicator,
} from 'react-native';
import {Icon, Image} from '@rneui/themed';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Buffer} from 'buffer';
import {useLogin} from '../../../../context/AuthProvider';
import client from '../../../../api/client';

const MyStoryScreen = () => {
  const navigation = useNavigation();
  const {stories} = useRoute().params;
  const {token} = useLogin();
  const length = stories.length
  const [visible, setVisible] = useState(false);

  const stopAnimation = () => setStop(true);

  const getAnImage = (idx) => {
    setLoading(true);
    const item = stories[idx]
    client
      .get(`/story/getStory?name=${item.filename}&contentType=${item.contentType}`, {
        headers: {Authorization: `Bearer ${token}`},
        responseType: 'arraybuffer',
      })
      .then(response => {
        console.log(`working ${index}`);
        let data =  `data:${
          response.headers['content-type']
        };base64,${new Buffer(response.data, 'binary').toString('base64')}`;
        setCurrentImage(data);
        setLoading(false);
      })
      .catch(err => console.log(err));
  }

  const [index, setIndex] = useState(0);
  const [currentImage, setCurrentImage] = useState();
  const [loading, setLoading] = useState(false);

  const next = () => {
    if (index < length - 1) {
      setIndex(index + 1);
      getAnImage(index + 1);
    } else {
      navigation.goBack();
    }
  }

  const previous = () => {
    if (index > 0) {
      setIndex(index - 1);
      getAnImage(index - 1);
    } else {
      navigation.goBack();
    }
  }

  const deleteStory = () => {
    client
      .delete('/story/deleteStory', {
          headers: {Authorization: `Bearer ${token}`},
          data: {storyId: stories[index]._id},
        })
        .then(response => {
          navigation.goBack();
        })
        .catch(error => {
          console.log(error);
        });
  }

  useEffect(() => getAnImage(0), []);

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: currentImage}} style={styles.image} resizeMode='cover'>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.userName}>Your Story</Text>
        <Icon
          name="close"
          color="white"
          size={32}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.indicatorContainer}>
        {stories.map((item, idx) => (
          <IndicatorBar type={idx === index ? 'active' : 'inactive'} key={idx} />
        ))}
      </View>

      {loading && <ActivityIndicator size='large' />}

      <View style={styles.naviIcon}>
        <Icon name='arrow-left' type='feather' onPress={previous} color='white' size={30} />
        <Icon name='arrow-right' type='feather' onPress={next} color='white' size={30} />
      </View>  
      
      {/* Delete Story */}
      <Icon
        name="trash-2"
        type="feather"
        size={30}
        color="white"
        containerStyle={styles.deleteIconContainer} 
        onPress={deleteStory}
      />
      </ImageBackground>
    </View>
  )
}

const IndicatorBar = ({type}) => (
  <View style={[styles.indicatorBar, styles[`indicatorBar_${type}`]]}>
  </View>
);

export default MyStoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    padding: 20,
    position: 'absolute',
    top: 40,
  },
  userName: {
    fontSize: 24,
    paddingLeft: 10,
    color: 'white',
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    top: 120,
    position: 'absolute',
    width: '100%',
  },
  indicatorBar: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    height: 8,
    marginHorizontal: 5,
  },
  indicatorBar_active: {
    backgroundColor: 'pink',
  },
  indicatorBar_inactive: {
    backgroundColor: 'white',
  },
  naviIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  deleteIconContainer: {
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
});