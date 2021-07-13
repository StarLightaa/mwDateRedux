import React, {useState, useCallback, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from 'react-native';

import {List} from '@ui-kitten/components';
import SearchItem from '../SearchScreen/components/SearchItem';

import moment from 'moment';
import {getMatches} from '../../store/actions/matches';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const SearchScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const matches = useSelector(store => store.matches.matches);
  const [isMatchesLoading, setIsMatchesLoading] = useState(true);

  const fetchMatches = useCallback(async () => {
    await dispatch(getMatches());
    setIsMatchesLoading(false); // call is finished, set to false
  }, []);

  useEffect(() => {
    fetchMatches().then(() => console.log('matches loading'));
  }, [fetchMatches]);

  const ageFromBirthday = (birthday) => {
    return moment().diff(birthday, 'years', false);
  };
  

  const onMessage = () => {
    console.log('123');
  };

  const onCard = () => {
    navigation.navigate('Anketa');
  };

  const renderItem = ({item}) => (
    <SearchItem
      userName={item?.name || ''}
      userAge={item?.birthday ? ageFromBirthday(item.birthday) : ''}
      userCity={item?.city_name || ''}
      userStatus={item?.status || ''}
      userMatchProcent='72'
      onMessage={onMessage}
      onCard={onCard}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <List
        style={styles.listContainer}
        contentContainerStyle={styles.contentContainer}
        data={matches}
        renderItem={(item) => renderItem(item)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const {height, width} = Dimensions.get('screen');
const screenWidth = width - 40;
const gap = screenWidth * 0.05;
const photoDimension = screenWidth * 0.3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    flex: 1,
  },
});
