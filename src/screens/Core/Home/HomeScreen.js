import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import CustomSwiper from '../../../components/CustomSwiper';
import RecRoutines from '../../../components/Home/RecRoutines';
import MyRoutines from '../../../components/Home/MyRoutines';
import {useNavigation} from '@react-navigation/native';
import {useLogin} from '../../../../context/AuthProvider';
import globalColors from '../../../../styles/colors';
import globalStyles from '../../../../styles/global';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {token} = useLogin();

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.scrollView}>

        {/*Header*/}
        <View style={styles.menuWrapper}>
          <Text style={styles.heading}>FunFit</Text>
        </View>

        {/* Swiper */}
        <CustomSwiper />

        {/* Recommended */}
        <RecRoutines token={token} navigation={navigation} />

        {/* My Routines */}
        <MyRoutines token={token} navigation={navigation}/>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: globalColors.babyBlue,
  },
});
