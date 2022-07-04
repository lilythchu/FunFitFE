import React, {useState, useEffect} from 'react';
import {StoryContainer} from 'react-native-stories-view';
import {useNavigation} from '@react-navigation/native';
import {Buffer} from 'buffer';
import {avaGender} from '../../../../utils/methods';
import {useLogin} from '../../../../context/AuthProvider';
import client from '../../../../api/client';

const MyStoryScreen = () => {
  const navigation = useNavigation();
  const {profile, token} = useLogin();
  const [images, setImages] = useState([]);

  const getImages = () => {
    client
      .get('/story/getStoriesInfo', {
        headers: {Authorization: `Bearer ${token}`},
        params: {id: profile._id},
      })
      .then(response => {
        const stories = response.data;
        for (let i = 0; i < stories.length; i++) {
          const filename = stories[i].filename;
          const contentType = stories[i].contentType;
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
        }
      })
      .catch(err => console.log(err));
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
        userImage: avaGender(profile.sex),
        userName: profile.name,
        userMessage: profile.lifestyleTarget,
        onImageClick: () => {
          console.log('lskndclksnc');
        },
      }}
      replyView={{
      isShowReply: true,
      onReplyTextChange: (textReply, progressIndex) => {
          console.log(`Text : ${textReply} , position : ${progressIndex}`);
      },
      onReplyButtonClick: (buttonType, progressIndex) => {
         switch (buttonType) {
            case 'send':
               console.log(`Send button tapped for position : ${progressIndex}`);
               break;

             case 'smiley':
               console.log(`Smiley button tapped for position : ${progressIndex}`);
               break;
          }
       },
   }}
    />
  )
}

export default MyStoryScreen;