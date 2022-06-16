import React, {useState} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
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
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const onAddRoutine = data => {
    setLoading(true);
    const body = {
      "name": data.name,
      "duration": duration,
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
  var duration = ['00', '00', '00'];
  var myLoop = [];
  var steps = [];
  var timings = [];

  for (let i = 0; i < number; i++) {
    steps[i] = `Step ${i + 1}`;
    timings[i] = ['00', '00', '00'];
    myLoop.push(
      <View style={{flexDirection: 'row'}}> 
        <TextInput
          style={{flex: 1, textAlign: 'center'}}
          placeholder={`Step ${i + 1}`}
          onChangeText={text => steps[i] = text}
        />
        <View style={styles.timingContainer}>
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
        type='THIRD'
        leftIcon={<Text>Name</Text>}
        control={control}
        rules={{
          required: "Name is required",
        }}
      />
      <CustomInput 
        name="genre"
        type='THIRD'
        leftIcon={<Text>Genre</Text>}
        placeholder="Genre"
        control={control}
        rules={{
          required: "Genre is required",
        }}
      />
      <View style={{flexDirection: 'row', paddingBottom: 10, paddingLeft: 10, alignItems: 'center'}}>
        <Text>Duration</Text>
        <View style={styles.timingContainer}>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => duration[0] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => duration[1] = number}
          />
          <Text>:</Text>
          <TextInput
            style={styles.textBox}
            keyboardType='numeric'
            placeholder='00'
            onChangeText={number => duration[2] = number}
          />
        </View>
      </View>

      <ListItem.Accordion
        style={{borderWidth: 1}}
        content={
          <ListItem.Content>
            <TextInput
              keyboardType='numeric'
              placeholder='Number of steps(< 10)'
              onChangeText={number => {
                setNumber(number);
                setExpanded(!expanded);
              }}
            />
          </ListItem.Content>
        }
        isExpanded={expanded}
      >
        <View style={{alignItems: 'center', marginVertical: 10}}>
          {myLoop}
        </View>
      </ListItem.Accordion>
      
      {/* Button */}
      { loading
        ? <ActivityIndicator size="large" style={globalStyles.activityIdicator} />
        : <CustomButton
            title="Create"
            onPress={handleSubmit(onAddRoutine)}
            type="SECOND"
          />
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
  timingContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})