import React, {useState} from 'react';
import {Text, ScrollView, ActivityIndicator, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import GenreChip from '../../components/Profile/GenreChip';

import {useRoute} from '@react-navigation/native';
import {useLogin} from '../../../context/AuthProvider';
import {useNavigation} from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import globalStyles from '../../../styles/global';
import client from '../../../api/client';

const ExtraInfoScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit} = useForm();
  const {token} = useRoute().params;
  const {setIsLoggedIn, setProfile} = useLogin();
  const interests = [];
  const onSubmitPressed = data => {
    setLoading(true);
    const info = {
      age: data.age,
      workoutInterests: interests,
      lifestyleTarget: data.lifestyleTarget,
    };
    client
      .put('user/updateProfile', info, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        // setProfile(response.data);
        // setIsLoggedIn(true);
        navigation.navigate("SignIn");
      })
      .catch(error => Alert.alert("Oops", "Something went wrong"))
      .finally(() => setLoading(false))
  };

  return (
    <ScrollView style={globalStyles.scrollView}>
      <Text style={[globalStyles.title, {padding: 30}]}>Extra Info</Text>
      <CustomInput
        name="age"
        control={control}
        placeholder="Age"
        keyboardType="numeric"
        rules={{
          required: 'Age is required',
        }}
      />
      <CustomInput
        name="lifestyleTarget"
        placeholder="Lifestyle Target"
        control={control}
        rules={{
          required: 'Lifestyle Target is required',
        }}
      />

      <GenreChip interests={interests} />
      {loading ? (
        <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
      ) : (
        <CustomButton
          type="SECOND"
          title="Submit"
          onPress={handleSubmit(onSubmitPressed)}
        />
      )}
    </ScrollView>
  );
};

export default ExtraInfoScreen;
