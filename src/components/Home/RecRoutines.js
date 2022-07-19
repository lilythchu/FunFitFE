import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList} from 'react-native';
import {ListItem, Icon} from 'react-native-elements';
import RecRoutineItem from './RecRoutineItem';
import client from '../../../api/client';

const RecRoutines = ({token, navigation}) => {
  const [recData, setRecData] = useState([]);

  const getRecData = () => {
    client
      .get('routine/getRecRoutines', {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => setRecData(response.data))
      .catch(error => console.log(error));
  };

  useEffect(() => getRecData(), [recData]);

  return (
    <View style={styles.discoverWrapper}>
      {/* Title */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Recommended', {token})}>
        <ListItem>
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>
              Discover
            </ListItem.Title>
          </ListItem.Content>
          <Icon name="chevron-right" size={24} color="black" type="feather" />
        </ListItem>
      </TouchableOpacity>

      {/* List */}
      <View style={styles.discoverItemsWrapper}>
        {recData && (
          <FlatList
            data={recData}
            renderItem={({item}) => (
              <RecRoutineItem item={item} navigation={navigation} />
            )}
            keyExtractor={item => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  )
}

export default RecRoutines;

const styles = StyleSheet.create({
  titleText: {
    fontSize: 32,
    fontWeight: '500',
  },
  discoverWrapper: {
    marginTop: 20,
  },
  discoverItemsWrapper: {
    paddingTop: 20,
  },
});