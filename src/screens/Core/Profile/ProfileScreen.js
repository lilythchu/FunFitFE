import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, StyleSheet, ScrollView, View} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import Settings from '../../../components/Profile/Settings';
import UserPic from '../../../components/Profile/UserPic';
import More from '../../../components/Profile/More';
import {useLogin} from '../../../../context/AuthProvider.js';
import globalStyles from '../../../../styles/global';
import axios from 'axios';

const ProfileScreen = () => {
  const {setIsLoggedIn, profile, token} = useLogin();
  const [expanded, setExpanded] = useState(false);

  const [level, setLevel] = useState({});
  useEffect(() => {
    const getLevel = () => {
      axios
        .get('https://orbital-funfit.herokuapp.com/user/level', {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => setLevel(res.data))
        .catch(err => console.log(err.response));
    };
    getLevel();
  }, [level]);

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
      <View style={styles.flexBox}> 
        <View style={styles.levelBoxLeft}> 
          <Text style={styles.levelTitle}> Level </Text>
          <Text style={styles.level}> {level.level} </Text>
        </View>
        <View style={styles.levelBoxRight}> 
          <Text style={styles.levelTitle}> Points </Text>
          <Text style={styles.level}> {level.points} </Text>
        </View>
      </View>

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
  level: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  levelBoxLeft: {
    borderRightWidth: 1,
    borderRightColor: 'grey',
    padding: 5,
    flex: 6
  },
  levelBoxRight: {
    padding: 5,
    flex: 6
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  }, 
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10
  }
});
