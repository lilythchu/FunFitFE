// import { StyleSheet, Text, View, Button } from 'react-native'
// import React from 'react'
// import { globalStyles } from '../../../styles/global.js'
// import { useNavigation } from '@react-navigation/native'
// import { useLogin } from '../../../context/AuthProvider.js'

// const ProfileScreen = () => {
//   const {setIsLoggedIn, profile, token} = useLogin();
//   const navigation = useNavigation();
//   const handleLogOut = () => {
//     setIsLoggedIn(false);
//   }

//   return (
//     <View style={globalStyles.container}>
//       <Text style={globalStyles.paragraph}>Hi {profile.name}</Text>
//       <Button title='Log out' onPress={handleLogOut}/>
//     </View>
//   )
// }

// export default ProfileScreen

// const styles = StyleSheet.create({})
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ava from '../../../assets/pf.jpg';
import { globalStyles } from '../../../styles/global';
import { useLogin } from '../../../context/AuthProvider.js'
import { ListItem, Icon } from '@rneui/themed';

const ProfileScreen = () => {
  const {setIsLoggedIn, profile, token} = useLogin();
  const [expanded, setExpanded] = useState(false);

  return (
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>

        <Image
          style={styles.userImg}
          source={ava}
        />

        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.aboutUser}>{profile.lifestyleTarget}</Text>

        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10,000</Text>
            <Text style={styles.userInfoSubTitle}>Stars</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>100</Text>
            <Text style={styles.userInfoSubTitle}>Rank</Text>
          </View>
        </View>

        <ListItem.Accordion
          content={
            <>
              <Icon name="place" size={30} />
              <ListItem.Content>
                <ListItem.Title>List Accordion</ListItem.Title>
              </ListItem.Content>
            </>
          }
          isExpanded={expanded}
          onPress={() => setExpanded(!expanded)}
        >
          <ListItem.Swipeable>
            <Icon name='av-timer' />
            <ListItem.Content>
              <ListItem.Title>Appointments</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem.Swipeable>

        </ListItem.Accordion>

      </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: 'center',
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});