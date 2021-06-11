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

const SearchScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Text>Search Screen</Text>
          <Button
            title="profile"
            onPress={() => navigation.navigate('Profile')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
