import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { ListItem } from '@rneui/themed';
import { globalStyles } from '../../../../styles/global';
import { addRoutineURL } from '../../../../api/client';
import { useLogin } from '../../../../context/AuthProvider';
import axios from 'axios';
import globalColors from '../../../../styles/colors';

const AddRoutineScreen = () => {
  const {token} = useLogin();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const [number, setNumber] = useState();
  const [loading, setLoading] = useState(false);

  const onAddRoutine = data => {
    setLoading(true);
    const body = {
      "name": data.name,
      "duration": data.duration,
      "genre": data.genre,
      "steps": steps,
      "timings": timings,
    };
    axios
      .post(addRoutineURL, body, {headers : {"Authorization": `Bearer ${token}`}})
      .then(response => {
        setLoading(false);
        navigation.navigate('Routine');
      })
      .catch(error => {
        console.log(error);
      });
  }

  var myLoop = [];
  var steps = [];
  var timings = [];
  
  for (let i = 0; i < number; i++) {
    timings[i] = new Array(3);
    myLoop.push(
      <View style={{flexDirection: 'row'}}> 
        <TextInput
          placeholder={`Step ${i + 1}`}
          onChangeText={text => steps[i] = text}
        />
        <View style={{flexDirection: 'row'}}>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => timings[i][0] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => timings[i][1] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => timings[i][2] = number}
          />
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={globalStyles.scrollView} showsVerticalScrollIndicator={false}>
      {/* Navigation */}
      <TouchableOpacity
        style={globalStyles.backIcon}
        onPress={() => navigation.goBack()}>
        <Entypo name='chevron-left' size={32} color={globalColors.babyBlue} />
      </TouchableOpacity>

      {/* Title */}
      <Text style={[globalStyles.title, {fontSize: 21}]}>Creat your own Routine</Text>
      
      {/* Form */}
      <CustomInput 
        name="name"
        placeholder="Name"
        control={control}
        rules={{
          required: "Name is required",
        }}
      />
      <CustomInput 
        name="genre"
        placeholder="Genre"
        control={control}
        rules={{
          required: "Genre is required",
        }}
      />
      <CustomInput 
        name="duration"
        placeholder="Duration"
        control={control}
        rules={{
          required: "Duration is required",
        }}
        rightIcon={<Text>/hours</Text>}
      />

      <ListItem.Accordion
        content={
          <>
            <TextInput 
              placeholder='Number of steps(< 10)'
              onChangeText={number => {
                setNumber(number);
                setExpanded(!expanded);
              }}
            />
          </>
        }
        isExpanded={expanded}
      >
        {myLoop}
      </ListItem.Accordion>
      
      {/* Button */}
      { loading
        ? <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
        : <CustomButton title="Add" onPress={handleSubmit(onAddRoutine)}/>
      }
    </ScrollView>
  )
}

export default AddRoutineScreen; 

const styles = StyleSheet.create({
  textBox: {
    borderWidth: 1,
    width: 30,
    margin: 5,
    textAlign: 'center',
  },
})