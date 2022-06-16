import React, {useState} from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import * as Speech from 'expo-speech';
import { arrayToSum } from '../../../../utils/methods';
import CustomButton from '../../../components/CustomButton';

const PlayAudio = () => {
  const [ith, setIth] = useState(0);
  const [start, setStart] = useState(false);
  const [valid, setValid] = useState(true);
  const {item} = useRoute().params;

  const steps = item.steps;
  const timings = item.timings;
  
  if (steps[0] === undefined || timings[0] === undefined) {
    setValid(false);
  }
  
  const onStart = () => {
    Speech.speak("Let's get started");
    Speech.speak("step 1");
    Speech.speak(steps[0]);
    setStart(true);
  }
  const timeleft = () => {
    const thingToSay = '5 seconds left';
    Speech.speak(thingToSay);
  };
  const nextStep = () => {
    if (ith === steps.length) {
      Speech.speak("Done");
      setStart(false);
    } else {
      const stepName = steps[ith]
      Speech.speak('Next');
      Speech.speak(`Step ${ith + 1}`);
      Speech.speak(steps[ith]);
    }
  };

  return (
    <View style={styles.container}>
      <CountdownCircleTimer
        isPlaying={start}
        duration={arrayToSum(timings[0])}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        onComplete={() => ({
          shouldRepeat: true,
          delay: 5,
          newInitialRemainingTime: timings[ith] === undefined ? 0 : arrayToSum(timings[ith])
        })}
        colorsTime={[10, 6, 3, 0]}
        onUpdate={time => {
          if (time === 5) {
            timeleft();
            setIth(ith + 1);
          }
          if (time === 0) { nextStep(); }
        }}
      >
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 40 }}>
            {remainingTime}
          </Text>
        )}
      </CountdownCircleTimer>
      <CustomButton title='Start' onPress={onStart} type='SECOND' />
    </View>
  );
}

export default PlayAudio
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});