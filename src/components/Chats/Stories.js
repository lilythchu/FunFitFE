import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React from 'react';
import {LinearGradient} from 'expo-linear-gradient';
import userData from '../../../assets/data/userData';
import {Image} from '@rneui/themed';

export const StoryItem = ({item, navigation, rounded}) => {
  return (
    <View style={{width: 75, padding: 5}}>
      {rounded ? (
        <LinearGradient
          colors={['#50b1f2', '#c7c432', '#32c790']}
          style={{padding: 2, borderRadius: 50}}>
          <Image
            source={item.photo}
            containerStyle={[styles.userImage, {borderWidth: 4}]}
            PlaceholderContent={<ActivityIndicator />}
            onPress={() => navigation.navigate('Story', {item})}
          />
        </LinearGradient>
      ) : (
        <Image
          source={item.photo}
          containerStyle={[styles.userImage, {borderWidth: 4}]}
          PlaceholderContent={<ActivityIndicator />}
          onPress={() => navigation.navigate('OtherProfile')}
        />
      )}
      <Text style={styles.username}>{item.name}</Text>
    </View>
  );
};

const Stories = ({navigation}) => {
  return (
    <View style={{paddingLeft: 20, paddingBottom: 15}}>
      <FlatList
        data={userData}
        keyExtractor={item => item.id}
        horizontal
        renderItem={({item}) => (
          <StoryItem item={item} navigation={navigation} rounded={true} />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderColor: '#ffffff',
  },
  username: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
});
