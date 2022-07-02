import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import RecCard from '../../../components/Home/RecCard';
import CategoryList from '../../../components/Home/CategoryList';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import client from '../../../../api/client';

const RecScreen = () => {
  const navigation = useNavigation();
  const {token} = useLogin();
  const [recData, setRecData] = useState([]);
  const [selectedId, setSelectedId] = useState();
  const [loading, setLoading] = useState(false);

  const getByGenre = genre => {
    setLoading(true);
    client
      .get('/routine/getRoutinesByGenre', {
        headers: {Authorization: `Bearer ${token}`},
        params: {genre: genre},
      })
      .then(res => {
        setRecData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
      <CategoryList
        selectedId={selectedId}
        getByGenre={getByGenre}
        setSelectedId={setSelectedId}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={recData}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <RecCard item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};

export default RecScreen;
