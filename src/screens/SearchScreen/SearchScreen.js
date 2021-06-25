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
    <SafeAreaView style={{flex:1, justifyContent:'flex-end', alignItems: 'center'}}>
      <ScrollView>
        <View>
          <Text>В процессе разработки :)</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
