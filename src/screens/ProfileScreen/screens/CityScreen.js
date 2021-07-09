import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';

import {LocalizationContext} from '../../../localization/LocalizationContext';
import HeaderBar from '../../../components/HeaderBar';
import AutoCompleteInput from 'react-native-tomtom-autocomplete';

import {updateUser} from '../../../store/actions/auth';

const CityScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const user = useSelector(store => store.auth.user);
  const locale = useSelector(store => store.settings.localeValue);

  const goBack = () => {
    navigation.goBack();
  };

  const saveData = item => {
    console.log('saveCity',item);
    dispatch(
      updateUser({
        country_name: item?.address?.country || '',
        country_code: item?.address?.countryCode || '',
        city_name: item?.address?.localName || item?.address?.freeformAddress || '',
        position_lat: item?.position?.lat || '',
        position_lon: item?.position?.lon || '',
      }),
    );
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={translations.CITY.HEADER_TITLE}
        showLeftButton
        onBackPress={goBack}
      />
      <AutoCompleteInput
        inputProps={{
          placeholder: translations.CITY.INPUT_PLACEHOLDER,
        }}
        onPress={item => saveData(item)}
        inputContainerStyle={{
          padding: 10,
          margin: 10,
          borderRadius: 10,
          backgroundColor: '#EBEBEB',
        }}
        listItemsContainerStyle={{
          flex: 1,
          padding: 10,
          marginHorizontal: 10,
        }}
        bottomDivider
        tomtomOptions={{key: 'IcPlzxOAAQfcerquAbv7oUfHJApBArEf'}}
        delay={700}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  birthdayLabel: {
    fontSize: 16,
    fontWeight: '700',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
});

export default CityScreen;
