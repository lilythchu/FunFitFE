import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { useRoute } from '@react-navigation/native';
import { WebView } from 'react-native-webview';

const PlayVideo = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const route = useRoute();
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <WebView
        //source={{ uri: `https://www.youtube.com/embed/${item.youtubeVideoId}` }}
        source={{uri: item.youtubeVideo}}
        style={{ marginTop: 20 }}
      />
      {/* <Video 
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://www.youtube.com/embed/bleOTMDa3_4',
        }}
        useNativeControls
        resizeMode='contain'
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      /> */}
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
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});