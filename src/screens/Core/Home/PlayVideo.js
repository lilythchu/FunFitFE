import React, {useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {useLogin} from '../../../../context/AuthProvider';
import {addDayFollow} from '../../../../utils/methods';
import client from '../../../../api/client';

const PlayVideo = () => {
  const {item} = useRoute().params;
  const {token} = useLogin();
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      addDayFollow(item._id, token);
    }
  }, []);

  return (
    <View style={styles.container}>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={item.youtubeVideo}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default PlayVideo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
});
