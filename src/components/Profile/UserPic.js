import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {Avatar} from 'react-native-elements';
import globalColors from '../../../styles/colors';
import globalStyles from '../../../styles/global';
import {Buffer} from 'buffer';
import {uploadImageURL, downloadPicURL} from '../../../api/client';
import {firstLetterofName} from '../../../utils/methods';
import axios from 'axios';

const UserPic = ({token, names}) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const downloadPic = () => {
    setLoading(true);
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
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      {loading ? (
        <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
      ) : (
        <Avatar
          size={90}
          rounded
          source={image && {uri: image}}
          title={firstLetterofName(names)}
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
      )}
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
