import React, {useState} from 'react';
import * as Speech from 'expo-speech';
import { Audio } from 'expo-av';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { arrayToSum } from '../../../../utils/methods';
import CustomButton from '../../../components/CustomButton';
import globalStyles from '../../../../styles/global';
import globalColors from '../../../../styles/colors';
import { useLogin } from '../../../../context/AuthProvider';
import { addDayURL } from '../../../../api/client';
import axios from 'axios';

const PlayAudio = () => {
  const {token} = useLogin();
  const [ith, setIth] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);
  const [startWorkout, setStartWorkout] = useState(false);
  const [done, setDone] = useState(false);
  const {item} = useRoute().params;

  const steps = item.steps;
  const timings = item.timings;
  
  {/* Start Workout */}
  const onStart = () => {
    setStartWorkout(true);
    //playSound();
    Speech.speak("Let's get started");
    Speech.speak("step 1");
    Speech.speak(steps[0], {
      onDone: () => {
        setStartTimer(true);
        playSound();
        setPlayingSound(true);
      }
    });
  }

  const addDayFollow = () => {
    axios
      .post(addDayURL,
        {id: item._id},
        {headers: {"Authorization": `Bearer ${token}`}}
      )
      .catch(err => console.log(err));
  }

  const onPause = async () => {
    await sound.pauseAsync();
    setPlayingSound(false);
  }

  const onPlaySound = async () => {
    await sound.playAsync();
    setPlayingSound(true);
  }

  const onPlayAndPause = () => {
    if (playingSound) {
      onPause();
    } else {
      onPlaySound();
    }
  }

  const timeleft = () => {
    const thingToSay = '10 seconds left';
    Speech.speak(thingToSay);
  };

  const nextStep = () => {
    if (ith === steps.length) {
      Speech.speak("Done");
      addDayFollow();
      setStartTimer(false);
      setPlayingSound(false);
      setDone(true);
      pauseSound();
    } else {
      const stepName = steps[ith]
      Speech.speak('Next');
      Speech.speak(`Step ${ith + 1}`);
      Speech.speak(steps[ith]);
    }
  };

  const [sound, setSound] = useState();

  const pauseSound = async () => {
    sound.pauseAsync();
  }

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
       require('../../../../assets/audio/bg.mp3'),
       {
        shouldPlay: true,
        isLooping: true,
        volume: 0.2,
       }
    );
    setSound(sound);
    //await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ith === steps.length ? `Done` : `Step ${ith + 1}`}</Text>
      <Text style={styles.subtitle}>{steps[ith]}</Text>
      <CountdownCircleTimer
        isPlaying={playingSound}
        duration={arrayToSum(timings[0])}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        onComplete={() => ({
          shouldRepeat: true,
          delay: 5,
          newInitialRemainingTime: timings[ith] === undefined ? 0 : arrayToSum(timings[ith])
        })}
        colorsTime={[10, 6, 3, 0]}
        onUpdate={time => {
          if (time === 10) {
            timeleft();
          }
          if (time ===1) {
            setIth(ith + 1);
          }
          if (time === 0) {
            nextStep();
          }
        }}
      >
        {({ remainingTime, color }) => (
          <Text style={{ color, fontSize: 40 }}>
            {`${Math.floor(remainingTime / 3600)} : ${Math.floor((remainingTime % 3600) / 60)}: ${remainingTime % 60}`}
          </Text>
        )}
      </CountdownCircleTimer>
      { !startWorkout && 
        <CustomButton
          title='Start'
          onPress={onStart}
          type='SECOND'
        />
      }
      { startWorkout && !done &&
        <CustomButton
          title={playingSound ? 'Pause' : 'Play'}
          onPress={onPlayAndPause}
          type='SECOND'
        />
      }
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
    backgroundColor: 'white',
  },
  title: {
    color: globalColors.babyBlue,
    textAlign: 'center',
    padding: 20,
    fontWeight: '700',
    fontSize: 25,
  },
  subtitle: {
    color: globalColors.babyBlue,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 20,
    paddingBottom: 60,
  },
});