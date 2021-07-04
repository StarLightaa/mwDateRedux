import React, {useState, useContext, useEffect, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {StyleSheet, SafeAreaView, View} from 'react-native';

import {LocalizationContext} from '../../../localization/LocalizationContext';

import HeaderBar from '../../../components/HeaderBar';
import RadioButton from '../../../components/RadioButton';

import {getCategoryTranslate} from '../../../store/actions/translates';
import {updateUser} from '../../../store/actions/auth';

const SexScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const user = useSelector(store => store.auth.user);
  const sex = user ? user.sex : '';
  const [value, setValue] = useState(sex.id);
  const [genders, setGenders] = useState([]);
  const [genderTitle, setGenderTitle] = useState('');

  const loadTranslate = useCallback(async () => {
    let fetchData = await dispatch(getCategoryTranslate('gender'));
    if (fetchData) {
      fetchData = fetchData.filter(function (item) {
        if (item.is_group_title == 1) {
          setGenderTitle(item.ru);
        }
        return item.is_group_title != 1;
      });
    }
    setGenders(fetchData);
  }, []);

  useEffect(() => {
    loadTranslate();
  }, [loadTranslate]);

  const onCheckedChange = ({item}) => {
    setValue(item.id);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const saveData = () => {
    dispatch(
      updateUser({
        sex: value,
      }),
    );
    // setEdited(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={genderTitle}
        showLeftButton
        showRightButton
        onBackPress={goBack}
        onRightPress={saveData}
      />
      <View style={styles.itemMainView}>
        {genders.map(item => {
          return (
            <RadioButton
              key={item.id}
              item={item}
              title={item.ru}
              isChecked={value === item.id ? true : false}
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

export default SexScreen;
