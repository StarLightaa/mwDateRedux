import React, {useContext, useState, useEffect} from 'react';
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

import {LocalizationContext} from '../../localization/LocalizationContext';
import Container from '../../components/Container';
import HeaderBar from '../../components/HeaderBar';
import ListItem from '../../components/ListItem';

import {ANKETA_ITEMS} from '../../store/constants/index';

const AnketaScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const onPressItem = async ({itemName}) => {
    switch (itemName) {
      case 'hair_color':
        navigation.navigate('HairColor');
        break;

      case 'hobbies':
        navigation.navigate('Hobbies');
        break;

      // case 'switch-account':
      //   navigation.navigate('Account', {accounts});
      //   break;

      default:
        break;
    }
  };

  const getAnketaItemValue = itemName => {
    switch (itemName) {
      case 'hair_color':
        return 'Цвет волос';

      case 'hobbies':
        return 'Хобби';

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title={translations.ANKETA.HEADER_TITLE} />
      <Container>
        <View style={styles.itemListView}>
          {ANKETA_ITEMS.map((item, index) => (
            <ListItem
              key={item.text}
              text={translations.getString(`ANKETA.${item.text}`)}
              value={getAnketaItemValue(item.itemName)}
              checked={item.checked}
              iconSize={item.iconSize || 26}
              itemType={item.itemType}
              iconName={item.iconName}
              itemName={item.itemName}
              onPressItem={onPressItem}
            />
          ))}
        </View>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: theme['background-basic-color-1'],
  },
  itemListView: {
    flex: 1,
  },
});

export default AnketaScreen;
