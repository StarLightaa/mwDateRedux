import React, {useState, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, View} from 'react-native';

import {LocalizationContext} from '../../../localization/LocalizationContext';

import HeaderBar from '../../../components/HeaderBar';
import CheckBox from '../../../components/CheckBoxItem';

const HobbiesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const [value, setValue] = useState('hobbies_7');

  const onCheckedChange = ({item}) => {
    setValue(item);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const HOBBIES  = {
    hobbies_6: 'gardening',
    hobbies_7: 'sports',
    hobbies_8: 'arts',
  }

  const hobby = Object.keys(HOBBIES);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title="Хобби" showLeftButton onBackPress={goBack} />
      <View style={styles.itemMainView}>
        {hobby.map(item => {
          return (
            <CheckBox
              key={HOBBIES[item]}
              item={item}
              title={HOBBIES[item]}
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

export default HobbiesScreen;
