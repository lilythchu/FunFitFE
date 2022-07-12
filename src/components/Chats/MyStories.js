import React, {useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {View, Text, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {Avatar, ThemeProvider, Dialog} from '@rneui/themed';
import {avaGender} from '../../../utils/methods';
import client, {uploadStoryURL} from '../../../api/client';

const MyStories = ({token, navigation, userInfo}) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [visibleDia, setVisibleDia] = useState(false);
  const [stories, setStories] = useState([]);
  
  const uploadImage = (uri) => {
    setVisibleDia(true);
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);
    var formdata = new FormData();
    formdata.append('file', {
      uri: uri,
      name: 'file',
      type: 'image/png',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
    };

    fetch(uploadStoryURL, requestOptions)
      .then(response => response.text())
      .then(result => {
        setVisibleDia(false);
      })
      .catch(error => console.log(error));
  };

  const newStories = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };
  
  const getStoriesInfo = () => {
    client
      .get('/story/getStoriesInfo', {
        headers: {Authorization: `Bearer ${token}`},
        params: {id: userInfo._id},
      })
      .then(response => setStories(response.data))
      .catch(err => console.log(err));
  }

  const viewMyStories = () => {
    if (stories[0] === undefined) {
      Alert.alert("You don't have any stories");
    } else {
      navigation.navigate('MyStory', {stories})
    }
  }

  useEffect(() => getStoriesInfo(), [stories]);

  return (
    <LinearGradient
      colors={['#50b1f2', '#c7c432', '#32c790']}
      style={{padding: 3, borderRadius: 70}}>
      <Avatar
        size={64}
        rounded
        source={avaGender(userInfo.sex)}
        onPress={viewMyStories}
        containerStyle={{backgroundColor: 'grey'}}>
        <Avatar.Accessory
          name="plus"
          type="feather"
          size={23}
          onPress={newStories}
        />
      </Avatar>

      <ThemeProvider>
        <Dialog
          isVisible={visibleDia}
          overlayStyle={{borderRadius: 15}}>
          <Dialog.Title title="Uploading File..." />
        </Dialog>
      </ThemeProvider>
    </LinearGradient>
  )
};

export default MyStories;