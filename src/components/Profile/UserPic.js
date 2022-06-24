import React, {useState} from 'react';
import { StyleSheet, View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from '@rneui/themed';
import globalColors from '../../../styles/colors';
import { uploadImageURL, downloadPicURL } from '../../../api/client';
import axios from 'axios';

const UserPic= ({token, names}) => {
  const [image, setImage] = useState(null);

  const downloadPic = () => {

  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      await setImage(result.uri);
      uploadImage();
    };
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', {
      name: 'file',
      uri: image,
      type: 'image/jpeg',
    });

    try {
      const res = await axios.post(uploadImageURL, formData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.userImage}>
      <Avatar 
        size={90}
        rounded
        source={image && {uri: image}}
        title={names.charAt(0).toUpperCase()}
        containerStyle={{backgroundColor: globalColors.navyBlue}}
      >
        <Avatar.Accessory
          size={23}
          name="camera"
          type="feather"
          onPress={pickImage}
          iconStyle={{color: 'black'}}
          style={{backgroundColor: globalColors.cream}}
        />   
      </Avatar>
    </View>
  )
}

export default UserPic;

const styles = StyleSheet.create({
  userImage: {
    alignItems: 'center',
    marginTop: 20,
  },
});