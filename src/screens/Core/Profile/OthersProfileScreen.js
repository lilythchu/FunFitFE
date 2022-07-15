import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from '@rneui/themed';
import CustomButton from '../../../components/CustomButton';
import Chevron from '../../../components/Chevron';
import globalStyles from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import {arrayToString} from '../../../../utils/methods';
import {avaGender} from '../../../../utils/methods';
import client from '../../../../api/client';

const OthersProfileScreen = () => {
  const {info, token} = useRoute().params;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const initConvo = () => {
    setLoading(true);
    client
      .post(
        '/chat/initiateConvo',
        {anotherUserId: info._id},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(res => {
        setLoading(false);
        navigation.navigate('ChatStory');
      })
      .catch(err => {
        navigation.navigate('ChatStory');
      });
  };

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      style={globalStyles.scrollView}>
      <Chevron navigation={navigation} color={globalColors.blueFaded} />

      <View style={{alignSelf: 'center'}}>
        <Avatar
          size={150}
          rounded
          source={avaGender(info.sex)}
          containerStyle={{backgroundColor: 'lightgray'}}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.username}>{info.name}</Text>
          <Text style={styles.bio}>{info.lifestyleTarget}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={[styles.subInfoContainer, {flex: 1, marginRight: 5}]}>
          <Text style={styles.subTitle}>Level</Text>
          <Text style={styles.text}>{info.level}</Text>
        </View>
        <View style={[styles.subInfoContainer, {flex: 1, marginLeft: 5}]}>
          <Text style={styles.subTitle}>Points</Text>
          <Text style={styles.text}>{info.points}</Text>
        </View>
        <View style={[styles.subInfoContainer, {flex: 1, marginLeft: 5}]}>
          <Text style={styles.subTitle}>Age</Text>
          <Text style={styles.text}>{info.age}</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={[styles.subInfoContainer, {flex: 1, marginRight: 5}]}>
          <Text style={styles.subTitle}>Workout Interests</Text>
          <Text style={styles.text}>
            {arrayToString(info.workoutInterests)}
          </Text>
      </View>

      </View>

      <CustomButton type="THIRD" title="Message" onPress={initConvo} loading={loading} />
    </ScrollView>
  );
};

export default OthersProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  username: {
    fontWeight: '500',
    fontSize: 28,
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
  bio: {
    fontSize: 18,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5,
  },
  subInfoContainer: {
    alignItems: 'center',
    // backgroundColor: globalColors.cream,
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
  },
});
