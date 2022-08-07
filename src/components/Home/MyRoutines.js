import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, KeyboardAvoidingView} from 'react-native';
import { SearchBar } from 'react-native-elements';
import {ListItem, Icon} from 'react-native-elements';
import MyRoutineItem from './MyRoutineItem';
import client from '../../../api/client';

const MyRoutines = ({token, navigation}) => {
  const [myData, setMyData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchVal, setSearchVal] = useState("");

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

  const searchFunc = (val) => {
    const updatedData = myData.filter((routine) => {
      const routine_title = `${routine.name.toUpperCase()}`;
      const val_title = val.toUpperCase(); 
      return routine_title.indexOf(val_title) > -1; 
    })
    setSearchVal(val);
    setSearchData(updatedData);
  }

  useEffect(() => getMyData(), [myData]);

  return (
    <KeyboardAvoidingView
    contentContainerStyle={{flex: 1}}
    behavior={"height"}
    >
      <View style={styles.myRoutineItemsWrapper}> 
      {/* Title */}
      <ListItem>
        <ListItem.Content>
          <ListItem.Title style={styles.myRoutineTitle}>
            My Routines
          </ListItem.Title>
        </ListItem.Content>
        <Icon
          testID="addRoutine"
          type="feather"
          name="plus"
          size={24}
          color="black"
          onPress={() => navigation.navigate('AddRoutine')}
        />
      </ListItem>

      {/* List */}
      
      <View style={styles.myRoutineItemsWrapper}>
        <SearchBar
          placeholder='Search your routine name here '
          lightTheme
          
          value={searchVal}
          onChangeText={(val) => searchFunc(val)}
          autoCorrect={false}
        />

        {myData && (
          <FlatList
            data={searchData.length === 0 ? myData : searchData}
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
    </KeyboardAvoidingView>

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