import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {StoryContainer} from 'react-native-stories-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Buffer} from 'buffer';
import {avaGender} from '../../../../utils/methods';
import client from '../../../../api/client';

const StoryScreen = () => {
  const navigation = useNavigation();
  const {userInfo, token, stories} = useRoute().params;
  const [images, setImages] = useState(new Array(stories.length));

  const getImages = () => {
    stories.map((item, index) => {
      client
        .get(`/story/getStory?name=${item.filename}&contentType=${item.contentType}`, {
          headers: {Authorization: `Bearer ${token}`},
          responseType: 'arraybuffer',
        })
        .then(response => {
          let data = `data:${
            response.headers['content-type']
          };base64,${new Buffer(response.data, 'binary').toString('base64')}`;
          images[index] = data;
        })
        .catch(err => Alert.alert("Error"));
    })
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <StoryContainer
      visible={true}
      enableProgress={true}
      images={images}
      onComplete={() => navigation.goBack()}
      duration={20}  
      containerStyle={{
          width: '100%',
          height: '100%',
      }}
      userProfile={{
        userImage: avaGender(userInfo.sex),
        userName: userInfo.name,
        userMessage: userInfo.country,
        onImageClick: () => {
          console.log('lskndclksnc');
        },
      }}
    />
  )
}

export default StoryScreen;