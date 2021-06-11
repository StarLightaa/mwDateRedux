import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from 'react-native';

import {onLogOut} from '../../store/actions/auth';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(onLogOut());
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Profile Screen</Text>
          <Button title="Log out" onPress={logoutUser} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
