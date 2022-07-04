import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Avatar} from '@rneui/themed';
import globalColors from '../../../styles/colors';
import {Buffer} from 'buffer';
import {uploadImageURL, downloadPicURL} from '../../../api/client';
import axios from 'axios';

const UserPic = ({token, names}) => {
  const [image, setImage] = useState(null);

  const downloadPic = () => {
    axios
      .get(downloadPicURL, {
        headers: {Authorization: `Bearer ${token}`},
        responseType: 'arraybuffer',
      })
      .then(response => {
        let data = `data:${
          response.headers['content-type']
        };base64,${new Buffer(response.data, 'binary').toString('base64')}`;
        setImage(data);
      })
      .catch(err => console.log(err));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      await setImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async uri => {
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

    fetch(uploadImageURL, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  useEffect(() => downloadPic(), []);

  return (
    <View style={styles.userImage}>
      <Avatar
        size={90}
        rounded
        source={image && {uri: image}}
        title={names.charAt(0).toUpperCase()}
        containerStyle={{backgroundColor: globalColors.navyBlue}}>
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
  );
};

export default UserPic;

const styles = StyleSheet.create({
  userImage: {
    alignItems: 'center',
    marginTop: 20,
  },
});
