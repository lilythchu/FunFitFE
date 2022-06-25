import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import { Icon, Image, Avatar} from '@rneui/themed';
import CustomButton from '../../../components/CustomButton';
import globalStyles from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import { useNavigation, useRoute } from '@react-navigation/native';
import Achievements from '../../../components/Profile/Achievements';
import { arrayToString } from '../../../../utils/methods';
import { iconGender } from '../../../../utils/methods';

import { initConvoURL } from '../../../../api/client';
import axios from 'axios';

const OthersProfileScreen = () => {
  const {info, token} = useRoute().params;
  const [request, setRequest] = useState(true);
  const navigation = useNavigation();
  
  const getStatus = () => {
    axios
      .post(initConvoURL,
        {anotherUserId: info._id},
        {headers: {"Authorization": `Bearer ${token}`}})
      .then(res => {
      })
      .catch(err => {
        setRequest(false);
      });
  }
  
  const initConvo = () => {
    console.log("init Convo");
  };

  const joinConvo = () => {
    navigation.navigate('Chat')
  }

  useEffect(() => getStatus(), []);

  return (
    <ScrollView showsHorizontalScrollIndicator={false} style={globalStyles.scrollView}>
      <View style={styles.titleBar}>
        <Icon
          name='chevron-left'
          size={32}
          type='entypo'
          color={globalColors.gray}
          onPress={() => navigation.goBack()}  
        />
      </View>

      <View style={{alignSelf: 'center'}}>
        <Avatar 
          size={150}
          rounded
          icon={{
            type: 'font-awesome',
            name: iconGender(info.sex)
          }}
          containerStyle={{backgroundColor: 'lightgray'}}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{info.name}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.subInfoContainer, {flex: 2, marginRight: 5}]}>
          <Text style={styles.subTitle}>Workout Interests</Text>
          <Text style={styles.text}>{arrayToString(info.workoutInterests)}</Text>
        </View>
        <View style={[styles.subInfoContainer, {flex: 1, marginLeft: 5}]}>
          <Text style={styles.subTitle}>Age</Text>
          <Text style={styles.text}>{info.age}</Text>
        </View>
      </View>
      
      { 
        request
          ? <CustomButton 
              type='FIFTH'
              title='Message'
              onPress={initConvo}
            />
          : <CustomButton 
              type='FIFTH'
              title="Friend"
            />
      } 
      {/* <Achievements /> */}

    </ScrollView>
  )
}

export default OthersProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  username: {
    fontWeight: '500',
    fontSize: 24,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: 'hidden',
  },
  nameContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  subInfoContainer: {
    alignItems: 'center',
    backgroundColor: globalColors.cream,
    borderRadius: 10,
    margin: 10,
    padding: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: globalColors.username,
  },
  text: {
    fontSize: 14,
    padding: 5,
    textAlign: 'center',
  },
  btnTitle: {
    borderWidth: 1,
    textAlign: 'center',
    padding: 10,
    fontSize: 20,
    borderRadius: 5,
    width: 150,
    alignSelf: 'center',
    borderColor: globalColors.blueFaded,
    color: globalColors.navyBlue,
  }
})