import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import { globalStyles } from '../../../styles/global';
import { useLogin } from '../../../context/AuthProvider.js'
import { ListItem, Icon, Avatar, Switch } from '@rneui/themed';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm } from 'react-hook-form';
import { updateProfileURL } from '../../../api/client';
import globalColors from '../../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {setIsLoggedIn, profile, token, setProfile} = useLogin();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const [switch1, setSwitch1] = useState(true);

  const handleLogOut = () => {
    setIsLoggedIn(false);
  }
  const updateUserInfo = data => {
    console.log(data);
    axios
      .post(updateProfileURL, data, {headers: {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setProfile(response.data);
        setExpanded(false);
      })
      .catch(error => console.log(error));
  }
  const onChangeInterests = () => {
    //navigation.navigate('ChangeInterests');
  }

  return (
      <ScrollView style={globalStyles.scrollView} showsVerticalScrollIndicator={false}>
        {/* User Avatar */}
        <View style={styles.userImage}>
          <Avatar 
            size={90}
            rounded
            title={profile.name.charAt(0).toUpperCase()}
            containerStyle={{backgroundColor: globalColors.navyBlue}}
          >
            {/* <Avatar.Accessory
              size={23}
              name="camera"
              type="feather"
            />   */}
          </Avatar>
        </View>

        {/* User name and bio */}
        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.aboutUser}>{profile.lifestyleTarget}</Text>
        
        {/* Settings */}
        <View style={styles.settingContainer}>
          {/* Title */}
          <ListItem bottomDivider containerStyle={globalStyles.roundTitle}>
            <Icon name='settings' />
            <ListItem.Title>Settings</ListItem.Title>
          </ListItem>

          {/* Account Settings */}
          <ListItem.Accordion
            content={
              <>
                <ListItem.Content>
                  <ListItem.Title>Account Settings</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
            bottomDivider
          >
            <View style={styles.accordionContainer}>
              <CustomInput 
                name='name'
                type='THIRD'
                placeholder='Name'
                control={control}
                rules={{
                  required: 'Name is required'
                }}
              />
              <CustomInput 
                name="sex"
                type='THIRD'
                control={control}
                placeholder="Male/Female/Others"
                rules={{
                  required: 'Gender is required',
                  validate: value => value === "Male" || value === "Female" || value === "Others" || 'Gender does not match', 
                }}
              />
              <CustomInput 
                name="age"
                type='THIRD'
                placeholder="Age"
                control={control}
                rules={{
                  required: 'Age is required'
                }}
              />
              <CustomButton
                type='SECOND' 
                title="Update"
                onPress={handleSubmit(updateUserInfo)}
              />
            </View>
          </ListItem.Accordion>

          {/* Workout Interests */}
          <ListItem bottomDivider  >
            <ListItem.Content>
              <ListItem.Title>Change workout interests</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color='black'/>
          </ListItem>

          {/* Noti */}
          <ListItem
            bottomDivider
            Component={TouchableOpacity}
            onPress={onChangeInterests}
          >
            <ListItem.Content>
              <ListItem.Title>Notifications</ListItem.Title>
            </ListItem.Content>
            <Switch 
              value={switch1}
              onValueChange={(value) => setSwitch1(value)}
            />
          </ListItem>

        </View>
        
        {/* More */}
        <View style={styles.moreContainer}>
          {/* Title */}
          <ListItem bottomDivider containerStyle={globalStyles.roundTitle}>
            <Icon name='list' type='feather'/>
            <ListItem.Title>More</ListItem.Title>
          </ListItem>

          {/* About us */}
          <ListItem bottomDivider Component={TouchableOpacity}>
            <Icon name='info' type='feather'/>
            <ListItem.Content>
              <ListItem.Title>About us</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color='black' />
          </ListItem>

          {/* Terms and Condition */}
          <ListItem bottomDivider Component={TouchableOpacity} >
            <Icon name='lightbulb-outline' />
            <ListItem.Content>
              <ListItem.Title>Terms and Conditions</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron color='black' />
          </ListItem>
        </View>

        {/* Log out */}
        <ListItem Component={TouchableHighlight} onPress={handleLogOut}>
          <ListItem.Content>
            <ListItem.Title>Log out</ListItem.Title>
          </ListItem.Content>
          <Icon name="log-out" type='feather'/>
        </ListItem>
      </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userImage: {
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  settingContainer: {
    marginVertical: 20,
  },
  moreContainer: {
    marginVertical: 20,
  },
  accordionContainer: {
    marginHorizontal: 30,
  },
});