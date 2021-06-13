import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';

import {Card, Layout, Text} from '@ui-kitten/components';

import {onLogOut, userProfile} from '../../store/actions/auth';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const user = useSelector(store => store.auth.user);
  const firstname = user ? user.firstname : '';
  const lastname = user ? user.lastname : '';
  const email = user ? user.email : '';

  const logoutUser = () => {
    dispatch(onLogOut());
  };

  const userProf = () => {
    dispatch(userProfile());
  };

  const Header = props => (
    <View {...props}>
      <Text category="h6">
        {firstname} {lastname}
      </Text>
      <Text category="s1">{email}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Card style={styles.card} header={Header}>
            <Text>With Header</Text>
          </Card>
          <Button title="UserProfile HTTP" onPress={userProf} />
          <Button title="Log out" onPress={logoutUser} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});

export default ProfileScreen;
