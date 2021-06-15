import React, {useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, View} from 'react-native';

import {setLocale} from '../../store/actions/settings';
import {LANGUAGES} from '../../store/constants';

import {LocalizationContext} from '../../localization/LocalizationContext';

import HeaderBar from '../../components/HeaderBar';
import LanguageItem from '../../components/LanguageItem';

const LanguageScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const settings = useSelector(state => state.settings);
  const localeValue = settings.localeValue || 'en';

  const languages = Object.keys(LANGUAGES);

  const {translations, setAppLanguage} = useContext(LocalizationContext);

  const handleSetLanguage = async language => {
    setAppLanguage(language);
    dispatch(setLocale(language));
  };

  const onCheckedChange = ({item}) => {
    handleSetLanguage(item);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={translations.SETTINGS.CHANGE_LANGUAGE}
        showLeftButton
        onBackPress={goBack}
      />
      <View style={styles.itemMainView}>
        {languages.map(item => {
          return (
            <LanguageItem
              key={LANGUAGES[item]}
              item={item}
              title={LANGUAGES[item]}
              isChecked={localeValue === item ? true : false}
              onCheckedChange={onCheckedChange}
            />
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerTitle: {
    marginVertical: 8,
    fontSize: 18,
    fontWeight: '600',
  },
  itemMainView: {
    borderBottomWidth: 1,
    borderBottomColor: '#E4E9F2',
    marginTop: 16,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },
  itemHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemText: {
    fontSize: 16,
  },
});

export default LanguageScreen;
