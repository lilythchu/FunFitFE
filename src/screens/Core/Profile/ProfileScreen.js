import React, {useState} from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView, View} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import Settings from '../../../components/Profile/Settings';
import UserPic from '../../../components/Profile/UserPic';
import LevelPoint from '../../../components/Profile/LevelPoint';
import More from '../../../components/Profile/More';
import {useLogin} from '../../../../context/AuthProvider.js';
import globalStyles from '../../../../styles/global';

const ProfileScreen = () => {
  const {setIsLoggedIn, profile, token} = useLogin();
  const [expanded, setExpanded] = useState(false);

  const handleLogOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <ScrollView
      style={globalStyles.scrollView}
      showsVerticalScrollIndicator={false}>
      {/* User Avatar */}
      <UserPic token={token} names={profile.name} />

      {/* User name and bio */}
      <Text style={styles.userName}>{profile.name}</Text>
      <Text style={styles.aboutUser}>{profile.lifestyleTarget}</Text>

      {/* Level and points*/}
      <LevelPoint token={token} />

      {/* Settings */}
      <Settings />

      {/* More */}
      <More />

      {/* Log out */}
      <ListItem
        Component={TouchableOpacity}
        onPress={handleLogOut}
        containerStyle={{marginBottom: 50}}>
        <ListItem.Content>
          <ListItem.Title>Log out</ListItem.Title>
        </ListItem.Content>
        <Icon name="log-out" type="feather" />
      </ListItem>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'center',
  },
  aboutUser: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
});
