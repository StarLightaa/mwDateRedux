import React, {useState, useContext, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';

import HeaderBar from '../../../components/HeaderBar';
import RadioButton from '../../../components/RadioButton';

import {
  getAnketaRadioValues,
  updateAnketa,
} from '../../../store/actions/anketa';

const EditAnketaScreen = ({route, navigation}) => {
  const {category, categoryText} = route.params;
  const dispatch = useDispatch();

  // const {isLoading, isEditing} = useSelector(store => store.anketa);
  const [isLoading, setIsLoading] = useState(true);

  const anketa = useSelector(store => store.anketa.fields);

  const prevValue = anketa?.[category].id;
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);

  const onCheckedChange = ({item}) => {
    setValue(item.id);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const saveData = () => {
    if (prevValue == value) {
      navigation.goBack();
    }

    dispatch(
      updateAnketa({
        [category + '_id']: value,
      }),
    );
    navigation.goBack();
  };

  const fetchListByCategory = useCallback(async () => {
    let data = await dispatch(getAnketaRadioValues(category));
    setList(data);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchListByCategory();
  }, [fetchListByCategory]);

  useEffect(() => {
    setValue(anketa?.[category].id);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={categoryText}
        showLeftButton
        showRightButton
        onBackPress={goBack}
        onRightPress={saveData}
      />

      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ccc" />
        </View>
      ) : (
        <View style={styles.itemMainView}>
          {list.map(item => {
            return (
              <RadioButton
                key={item.id}
                item={item}
                title={item.translate}
                isChecked={value === item.id ? true : false}
                onCheckedChange={onCheckedChange}
              />
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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

export default EditAnketaScreen;
