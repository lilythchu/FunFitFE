import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import GenreChip from '../../components/Profile/GenreChip';
import { useLogin } from '../../../context/AuthProvider';
import { useForm } from 'react-hook-form';
import globalStyles from '../../../styles/global';
import { updateProfileURL } from '../../../api/client';
import axios from 'axios';

const ExtraInfoScreen = () => {
  const [loading, setLoading] = useState(false);
  const {control, handleSubmit} = useForm();
  const {setIsLoggedIn, setProfile, token} = useLogin();
  const interests = [];
  
  const onSubmitPressed = data => {
    setLoading(true);
    const info = {
      "age": data.age,
      "workoutInterests": interests,
      "lifestyleTarget": data.lifestyleTarget
    }
    axios
      .post(updateProfileURL, info, {headers: {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setProfile(response.data);
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }

  return (
    <ScrollView style={globalStyles.scrollView}>
        <Text style={[globalStyles.title, {padding: 30}]}>Extra Info</Text>

        <CustomInput
          name="age"
          control={control}
          placeholder="Age"
          keyboardType='numeric'
          rules={{
            required: 'Age is required'
          }}
        />
        <CustomInput 
          name='lifestyleTarget'
          placeholder='Lifestyle Target'
          control={control}
          rules={{
            required: 'Lifestyle Target is required' 
          }}
        />

        <GenreChip interests={interests} />
        
        {loading
          ? <ActivityIndicator size='large' style={globalStyles.activityIdicator} />
          : <CustomButton
              type='SECOND'
              title="Submit"
              onPress={handleSubmit(onSubmitPressed)}
            />
        }
    </ScrollView>
  )
}

export default ExtraInfoScreen;