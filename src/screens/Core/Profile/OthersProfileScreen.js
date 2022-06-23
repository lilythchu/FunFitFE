import { StyleSheet, Text, View, ScrollView} from 'react-native'
import React, {useState} from 'react'
import { Icon, Image} from '@rneui/themed';
import CustomButton from '../../../components/CustomButton';
import globalStyles from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import Achievements from '../../../components/Profile/Achievements';

const OthersProfileScreen = () => {
  const navigation = useNavigation();
  const addFriend = () => {
    console.log("send request");
  };

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
        <View style={styles.profileImage}>
          <Image
            source={require('../../../../assets/images/australia.png')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>Name</Text>
        </View>
      </View>
      {/* <CustomButton 
        type='FIFTH'
        title='Request'
        onPress={addFriend}
      /> */}
      <Achievements />

    </ScrollView>
  )
}

export default OthersProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  userName: {
    fontWeight: '200',
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
  infoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
})