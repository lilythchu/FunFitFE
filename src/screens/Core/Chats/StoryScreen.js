import React, {useState, useEffect} from 'react';
import {StoryContainer} from 'react-native-stories-view';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Buffer} from 'buffer';
import {avaGender} from '../../../../utils/methods';
import client from '../../../../api/client';

const StoryScreen = () => {
  const navigation = useNavigation();
  const {userInfo, token} = useRoute().params;
  const [images, setImages] = useState([]);

  const getImages = () => {
    client
      .get('/story/getStoriesInfo', {
        headers: {Authorization: `Bearer ${token}`},
        params: {id: userInfo._id},
      })
      .then(response => 
        response.data.map((item, index) => {
          const filename = item.filename;
          const contentType = item.contentType;
          client
            .get(`/story/getStory?name=${filename}&contentType=${contentType}`, {
              headers: {Authorization: `Bearer ${token}`},
              responseType: 'arraybuffer',
            })
            .then(response => {
              let data = `data:${
                response.headers['content-type']
              };base64,${new Buffer(response.data, 'binary').toString('base64')}`;
              setImages(prev => [...prev, data]);
              console.log('okie');
            })
            .catch(err => console.log(err));
        })
      )
      .then(res => console.log(res))
      .catch(err => console.log(err))
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
        onImageClick: () => {
          console.log('lskndclksnc');
        },
      }}
    />
  )
}

export default StoryScreen;