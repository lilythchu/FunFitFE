import React, {useState} from 'react';
import {View, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Avatar, ThemeProvider, Dialog} from '@rneui/themed';
import {uploadStoryURL} from '../../../api/client';
import img from '../../../assets/images/australia.png';

const MyStories = ({token, navigation}) => {
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [visibleDia, setVisibleDia] = useState(false);
  
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
        console.log(result);
        setVisibleDia(false);
      })
      .catch(error => console.log('error', error));
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

  return (
    <View>
      <Avatar
        size={64}
        rounded
        source={img}
        onPress={() => navigation.navigate('MyStory')}
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
    </View>
  );
};

export default MyStories;