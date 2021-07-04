import React, {useContext, useState, useRef, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import {Button, Icon} from '@ui-kitten/components';

import moment from 'moment';
import {LocalizationContext} from '../../localization/LocalizationContext';
import Container from '../../components/Container';
import ModalWithInput from '../../components/ModalWithInput';
import HeaderBar from '../../components/HeaderBar';
import ListItem from '../../components/ListItem';
import ImagePicker from '../../components/ImagePicker';
import {DEFAULT_IMAGE_URI} from '../../store/constants/url';

import {USER_PRIMARY_ITEMS, ANKETA_ITEMS} from '../../store/constants/index';
import {updateUser} from '../../store/actions/auth';

const SettingsIcon = props => <Icon {...props} name="settings-2-outline" />;

const AnketaScreen = ({navigation}) => {
  const sheetRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);

  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const [modalNameVisible, setModalNameVisible] = useState(false);
  const user = useSelector(store => store.auth.user);
  const name = user ? user.name : '';
  const birthday = user ? user.birthday : '';

  const sex = user ? user.sex.ru : '';
  const [inputName, setInputName] = useState(name);

  const onPressItem = async ({itemName}) => {
    switch (itemName) {
      case 'name':
        setModalNameVisible(true);
        break;

      case 'age':
        navigation.navigate('Birthday');
        break;

      case 'sex':
        navigation.navigate('Sex');
        break;

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
      case 'name':
        return name;

      case 'age':
        return moment().diff(birthday, 'years', false);
      // return moment(birthday).format('DD.MM.YYYY');

      case 'sex':
        return sex;

      case 'hair_color':
        return 'Цвет волос';

      case 'hobbies':
        return 'Хобби';

      default:
        break;
    }
  };

  const goToSettings = () => {
    navigation.navigate('Profile');
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const onFileSelected = image => {
    closeSheet();
    console.log('image', image);
    setLocalFile(image);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title={translations.ANKETA.HEADER_TITLE} />
      <Container>
        <Button
          style={styles.button}
          accessoryLeft={SettingsIcon}
          onPress={goToSettings}
        />

        <TouchableOpacity onPress={openSheet}>
          <Image
            width={150}
            height={150}
            source={{uri: localFile?.path || localFile || DEFAULT_IMAGE_URI}}
            style={styles.imageView}
          />
          <Text style={styles.chooseText}>
            {localFile
              ? translations.COMMON.CHANGE_PHOTO
              : translations.COMMON.UPLOAD_PHOTO}
          </Text>
        </TouchableOpacity>

        <View style={styles.itemListView}>
          {USER_PRIMARY_ITEMS.map((item, index) => (
            <ListItem
              key={item.text}
              text={translations.getString(`PROFILE.${item.text}`)}
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

      <ModalWithInput
        modalVisible={modalNameVisible}
        setModalVisible={setModalNameVisible}
        title={translations.PROFILE.MODAL_TITLE_NAME}
        inputValue={inputName}
        setInputValue={setInputName}
        prevState={name}
        inputPlaceholder={translations.PROFILE.MODAL_PLACEHOLDER_NAME}
        onSuccess={updateUser({
          name: inputName,
        })}
      />
      <ImagePicker onFileSelected={onFileSelected} ref={sheetRef} />
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
    marginTop: 50,
  },
  button: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 100,
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 50,
    borderWidth: 0,
  },

  imageView: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: 'center',
  },

  chooseText: {
    // color: colors.primary,
    marginTop: 10,
    textAlign: 'center',
  },

  anketaMain: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AnketaScreen;
