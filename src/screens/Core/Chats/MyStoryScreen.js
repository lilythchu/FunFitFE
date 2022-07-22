import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Icon, Image} from 'react-native-elements';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Buffer} from 'buffer';
import {useLogin} from '../../../../context/AuthProvider';
import globalColors from '../../../../styles/colors';
import client from '../../../../api/client';
import ReplyBar from '../../../components/Chats/ReplyBar';
import { windowHeight } from '../../../../utils/Dimensions';

const MyStoryScreen = () => {
  const navigation = useNavigation();
  const {stories, userInfo, type} = useRoute().params;
  const {token} = useLogin();
  const length = stories.length;

  const getAnImage = (idx) => {
    setLoading(true);
    const item = stories[idx]
    client
      .get(`/story/getStory?name=${item.filename}&contentType=${item.contentType}`, {
        headers: {Authorization: `Bearer ${token}`},
        responseType: 'arraybuffer',
      })
      .then(response => {
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
      .then(response => navigation.goBack())
      .catch(error => Alert.alert('Oops', 'Something went wrong! Cannot delete this item'));
  }

  const onDeletePress = () =>
    Alert.alert(
      'Alert',
      'Are you sure want to delete', 
      [
        { text: "Cancel" },
        { text: "OK", onPress: () => deleteStory() },
      ]
    );

  useEffect(() => getAnImage(0), []);

  return (
    <View style={styles.container}>
      <ImageBackground source={{uri: currentImage}} style={styles.image} resizeMode='cover'>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.userName}>{type === 'friends' ? userInfo.name : 'Your story'}</Text>
        <Icon
          name="close"
          color={globalColors.storyText}
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
        <Icon
          name='chevron-left'
          type='entypo'
          onPress={previous}
          color={globalColors.storyText}
          size={30}
        />
        <Icon
          name='chevron-right'
          type='entypo'
          onPress={next}
          color={globalColors.storyText}
          size={30}
        />
      </View>  
      
      {/* Delete Story */}
      {type === 'mine' && (
        <Icon
          name="trash-2"
          type="feather"
          size={30}
          color={globalColors.storyText}
          containerStyle={styles.deleteIconContainer} 
          onPress={onDeletePress}
        />
      )}

      {/* Reply Story */}
      {type === 'friends' && (
        <View style={{height: 50, ...styles.replyContainer}}>
          <ReplyBar
          anotherUserId={userInfo._id}
          token={token}
          />
        </View> 
      )}
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
    top: 10,
  },
  userName: {
    fontSize: 24,
    paddingLeft: 10,
    color: globalColors.storyText,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 20,
    top: 60,
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
  replyContainer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 10,
  },
});