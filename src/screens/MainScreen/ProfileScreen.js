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
import { ListItem, Icon, Avatar } from '@rneui/themed';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useForm } from 'react-hook-form';

const ProfileScreen = () => {
  const {setIsLoggedIn, profile, token} = useLogin();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const handleLogOut = () => {
    setIsLoggedIn(false);
  }
  const updateUserInfo = data => {
    console.log(data);
  }

  return (
      <ScrollView
        style={globalStyles.scrollView}
        contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.userImage}>
          <Avatar 
            size={90}
            rounded
            source={ava}
          >
            <Avatar.Accessory size={23} />  
          </Avatar>
        </View>
        <Text style={styles.userName}>{profile.name}</Text>
        <Text style={styles.aboutUser}>{profile.lifestyleTarget}</Text>

        <View style={styles.settingContainer}>
          <ListItem.Accordion
            content={
              <>
                <Icon name="place" size={30} />
                <ListItem.Content>
                  <ListItem.Title>Account Setting</ListItem.Title>
                </ListItem.Content>
              </>
            }
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
          >
            {/* <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Name</ListItem.Title>
              </ListItem.Content>
              <ListItem.Input placeholder='Name'/>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Password</ListItem.Title>
              </ListItem.Content>
              <ListItem.Input placeholder='Password'/>
            </ListItem>
            <ListItem bottomDivider>
              <ListItem.Content>
                <ListItem.Title>Age</ListItem.Title>
              </ListItem.Content>
              <ListItem.Input placeholder='Age'/>
            </ListItem> */}
            <CustomInput 
              name='name'
              placeholder='Name'
              control={control}
            />
            <CustomInput 
              name='password'
              placeholder="Password"
              control={control}
            />
            <CustomInput 
              name="age"
              placeholder="Age"
              control={control}
            />
            <CustomButton
              type='THIRD' 
              title="Update"
              onPress={handleSubmit(updateUserInfo)}
            />
          </ListItem.Accordion>
        </View>
      </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  userImage: {
    marginTop: 40,
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
  settingContainer: {
    margin: 20,
  },
});