import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { globalStyles } from '../../../styles/global.js'
import { useNavigation } from '@react-navigation/native'
import { useLogin } from '../../../context/AuthProvider.js'

const ProfileScreen = () => {
  const {setIsLoggedIn} = useLogin();
  const navigation = useNavigation();
  const handleLogOut = () => {
    setIsLoggedIn(false);
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.paragraph}>ProfileScreen</Text>
      <Button title='Log out' onPress={handleLogOut}/>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})