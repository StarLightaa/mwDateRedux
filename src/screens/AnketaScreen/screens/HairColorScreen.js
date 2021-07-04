import React, {useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, View} from 'react-native';

import {LocalizationContext} from '../../../localization/LocalizationContext';

import HeaderBar from '../../../components/HeaderBar';
import RadioButton from '../../../components/RadioButton';

const HairColorScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const [value, setValue] = useState('shaten');

  const onCheckedChange = ({item}) => {};

  const goBack = () => {
    navigation.goBack();
  };

  const HAIRCOLORS  = {
    blond: 'блондин/блондинка',
    shaten: 'brown-haired male / brown-haired female',
    redhead: 'red-haired male / red-haired female',
  }

  const hairColor = Object.keys(HAIRCOLORS);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Цвет волос" showLeftButton onBackPress={goBack} />
      <View style={styles.itemMainView}>
        {hairColor.map(item => {
          return (
            <RadioButton
              key={HAIRCOLORS[item]}
              item={item}
              title={HAIRCOLORS[item]}
              isChecked={value === item ? true : false}
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

export default HairColorScreen;
