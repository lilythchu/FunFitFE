import React, {useState} from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useLogin } from '../../../context/AuthProvider';
import { globalStyles } from '../../../styles/global';
import { useForm } from 'react-hook-form';
import { updateProfileURL } from '../../../api/client';
import axios from 'axios';
import { Chip } from 'react-native-paper';

const ExtraInfoScreen = () => {
  const {control, handleSubmit} = useForm();
  const {setIsLoggedIn, setProfile, token} = useLogin();
  const interests = [];
  
  const onSubmitPressed = data => {
    const info = {
      "age": data.age,
      "workoutInterests": interests,
      "lifestyleTarget": data.lifestyleTarget
    }
    console.log(interests);
    axios
      .post(updateProfileURL, info, {headers: {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setProfile(response.data);
        setIsLoggedIn(true);
      })
      .catch(error => console.log(error));
  }

  const CustomChip = ({text, icon}) => {
    const [active, setActive] = useState(true);
    return (
      <View style={styles.chip}>
        <Chip
          icon={icon}
          mode="outlined"
          selectedColor="red"
          disabled={!active}
          onPress={() => {
            interests.push(text);
            setActive(false);
          }}>
          {text}
        </Chip>
      </View>
    );
  };

  return (
    <ScrollView style={globalStyles.scrollView}>
        <Text style={globalStyles.title}>Extra Info</Text>

        <CustomInput
          name="age"
          control={control}
          placeholder="Age"
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
        {/* <CustomInput 
          name='workoutInterests'
          placeholder='Choose from the below'
          control={control}
        /> */}

        <View>
          <Text style={styles.subTitle}>Choose your workout interests</Text>
          <View style={{flexDirection: 'row'}}>
            <CustomChip text='at-home' icon='heart' />
            <CustomChip text='yoga' icon='heart' />
          </View>

          <View style={{flexDirection: 'row'}}>
            <CustomChip text='equipment' icon='heart' />
            <CustomChip text='no-equipment' icon='heart' />
          </View>

          <View style={{flexDirection: 'row'}}>
            <CustomChip text='gym' icon='heart' />
            <CustomChip text='harsh' icon='heart' />
          </View>

          <CustomChip text='other' icon='heart' />
        </View>

        <CustomButton title="Submit" onPress={handleSubmit(onSubmitPressed)}/>
    </ScrollView>
  )
}

export default ExtraInfoScreen;

const styles = StyleSheet.create({
  chip: {
    width: 150,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    alignSelf: 'center',
    marginVertical: 20,
  },
})