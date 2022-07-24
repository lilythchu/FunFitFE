import React, {useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {ListItem} from 'react-native-elements';
import CustomInput from '../../../components/CustomInput';
import CustomButton from '../../../components/CustomButton';
import TimeInput from '../../../components/TimeInput';
import Chevron from '../../../components/Chevron';

import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import globalStyles from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import client from '../../../../api/client';

const AddRoutineScreen = () => {
  const {token} = useLogin();
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const {control, handleSubmit} = useForm();
  const [number, setNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const onAddRoutine = data => {
    setLoading(true);
    for (let i = 0; i < number; i++) {
      timings[i][0] = data[`h${i}`];
      timings[i][1] = data[`min${i}`];
      timings[i][2] = data[`sec${i}`];
    }
    const body = {
      name: data.name,
      duration: [data.hdur, data.mindur, data.secdur],
      genre: data.genre,
      steps: steps,
      timings: timings,
    };
    client
      .post('/routine/newRoutine', body, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => navigation.navigate('Routine'))
      .catch(error => {
        if (error.response.data === 'Please choose a different name') {
          Alert.alert("Oops", error.response.data);
        } else {
          Alert.alert("Oops", "Something went wrong")
        }
      })
      .finally(() => setLoading(false));
  };
  var myLoop = [];
  var steps = [];
  var timings = [];

  for (let i = 0; i < number; i++) {
    steps[i] = `Step ${i + 1}`;
    timings[i] = ['00', '00', '00'];
    myLoop.push(
      <View style={{flexDirection: 'row'}} key={i}>
        <TextInput
          style={{flex: 1, textAlign: 'center'}}
          placeholder={`Step ${i + 1}`}
          onChangeText={text => (steps[i] = text)}
        />
        <TimeInput control={control} name={i} />
      </View>,
    );
  }

  return (
    // <ScrollView
    //   style={globalStyles.scrollView}
    //   showsVerticalScrollIndicator={false}>
    <KeyboardAwareScrollView
    style={{ backgroundColor: "white" }}
    resetScrollToCoords={{ x: 0, y: 0 }}
    contentContainerStyle={globalStyles.scrollView}
    scrollEnabled={true}>
      {/* Navigation */}
      <Chevron navigation={navigation} color={globalColors.babyBlue} />

      {/* Title */}
      <Text style={[globalStyles.title, {fontSize: 21}]}>
        Create your own Routine
      </Text>

      {/* Form */}
      <CustomInput
        name="name"
        placeholder="Name"
        type="THIRD"
        leftIcon={<Text style={{fontSize: 16}}>Name</Text>}
        control={control}
        rules={{
          required: 'Name is required',
        }}
      />
      <CustomInput
        name="genre"
        type="THIRD"
        leftIcon={<Text style={{fontSize: 16}}>Genre</Text>}
        placeholder="Genre"
        control={control}
        rules={{
          required: 'Genre is required'
        }}
      />
      <View style={globalStyles.durationContainer}>
        <Text style={{fontSize: 16}}>Duration</Text>
        <TimeInput control={control} name="dur" />
      </View>

      <ListItem.Accordion
        style={{borderWidth: 1}}
        noIcon
        content={
          <ListItem.Content>
            <TextInput
              keyboardType="numeric"
              placeholder="Number of steps(< 10) ~ One digit input"
              onChangeText={num => {
                setNumber(num);
                setExpanded(!expanded);
              }}
            />
          </ListItem.Content>
        }
        isExpanded={expanded}>
        <View style={{alignItems: 'center', marginVertical: 10}}>{myLoop}</View>
      </ListItem.Accordion>

      {/* Button */}
      <CustomButton
        title="Create"
        onPress={handleSubmit(onAddRoutine)}
        type="SECOND"
        loading={loading}
      />
    {/* // </ScrollView> */}
    </KeyboardAwareScrollView>
  );
};

export default AddRoutineScreen;
