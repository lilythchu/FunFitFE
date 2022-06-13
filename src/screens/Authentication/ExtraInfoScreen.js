import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useLogin } from '../../../context/AuthProvider';
import { globalStyles } from '../../../styles/global';
import { useForm } from 'react-hook-form';
import { updateProfileURL } from '../../../api/client';
import axios from 'axios';
import { Chip } from 'react-native-paper';
import globalColors from '../../../styles/colors';

const ExtraInfoScreen = () => {
  const {control, handleSubmit} = useForm();
  const {setIsLoggedIn, setProfile, token} = useLogin();
  const interests = [];

  // const genre = [
  //   {id: '1', text: 'at-home', icon: ''},
  //   {id: '2', text: 'equipment', icon: ''},
  //   {id: '3', text: 'gym', icon: ''},
  //   {id: '4', text: 'harsh', icon: ''},
  //   {id: '5', text: 'no-equipment', icon: ''},
  //   {id: '6', text: 'yoga', icon: ''},
  //   {id: '7', text: 'others', icon: ''},
  // ]
  
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
          selectedColor={globalColors.navyBlue}
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

        <View>
          <Text style={styles.subTitle}>Choose your workout interests</Text>
          <View style={{flexDirection: 'row'}}>
            <CustomChip text='at-home' />
            <CustomChip text='yoga' icon='meditation' />
          </View>

          <View style={{flexDirection: 'row'}}>
            <CustomChip text='equipment' icon='dumbbell' />
            <CustomChip text='no-equipment'/>
          </View>

          <View style={{flexDirection: 'row'}}>
            <CustomChip text='gym' icon='weight-lifter' />
            <CustomChip text='harsh' />
          </View>

          <CustomChip text='other'/>
          {/* <FlatList 
            data={genre}
            renderItem={CustomChip}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsHorizontalScrollIndicator={false}
          /> */}
        </View>

        <CustomButton
          type='SECOND'
          title="Submit"
          onPress={handleSubmit(onSubmitPressed)}
        />
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