import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import MyRoutineItem from './MyRoutineItem';
import client from '../../../api/client';

const MyRoutines = ({token, navigation}) => {
  const [myData, setMyData] = useState([]);

  const getMyData = () => {
    client
      .get('/routine/getMyRoutines', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        setMyData(response.data);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => getMyData(), [myData]);

  return (
    <View style={styles.myRoutineWrapper}>
      {/* Title */}
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={styles.myRoutineTitle}>
            My Routines
          </ListItem.Title>
        </ListItem.Content>
        <Icon
          type="feather"
          name="plus"
          size={24}
          color="black"
          onPress={() => navigation.navigate('AddRoutine')}
        />
      </ListItem>

      {/* List */}
      <View style={styles.myRoutineItemsWrapper}>
        {myData && (
          <FlatList
            data={myData}
            renderItem={({item}) => (
              <MyRoutineItem
                navigation={navigation}
                item={item}
                token={token}
                type={item.youtubeVideo === undefined ? "created" : "rec"}
              />
            )}
            keyExtractor={item => item._id}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default MyRoutines;

const styles = StyleSheet.create({
  myRoutineWrapper: {
    marginBottom: 20,
  },
  myRoutineTitle: {
    fontSize: 24,
    fontWeight: '500',
  },
  myRoutineItemsWrapper: {
    //paddingVertical: 10,
  },
  discoverItemsWrapper: {
    paddingTop: 20,
  },
});