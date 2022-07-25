import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import client from '../../../api/client';

const LevelPoint = ({token}) => {
  const [level, setLevel] = useState({});
  useEffect(() => {
    const getLevel = () => {
      client
        .get('/user/level', {
          headers: {Authorization: `Bearer ${token}`}
        })
        .then(res => setLevel(res.data))
        .catch(err => console.log(err.response));
    };
    getLevel();
  }, [level]);

  return (
    <View style={styles.flexBox}> 
      <View style={styles.levelBoxLeft}> 
        <Text style={styles.levelTitle}> Level </Text>
        <Text style={styles.level}> {level.level} </Text>
      </View>
      <View style={styles.levelBoxRight}> 
        <Text style={styles.levelTitle}> Points </Text>
        <Text style={styles.level}> {level.points} </Text>
      </View>
    </View>
  )
}

export default LevelPoint;

const styles = StyleSheet.create({
  level: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  levelBoxLeft: {
    borderRightWidth: 1,
    borderRightColor: 'grey',
    padding: 5,
    flex: 6
  },
  levelBoxRight: {
    padding: 5,
    flex: 6
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  }, 
  flexBox: {
    flexDirection: 'row',
    paddingTop: 10,
  }
});