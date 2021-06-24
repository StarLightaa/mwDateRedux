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

import {Card, Layout, Text, Input} from '@ui-kitten/components';
import Container from '../../components/Container';
import HeaderBar from '../../components/HeaderBar';
import ModalWithInput from '../../components/ModalWithInput';
import ProfileItem from './components/ProfileItem';
import {PROFILE_ITEMS} from '../../store/constants/index';

import {onLogOut, userProfile, updateUser} from '../../store/actions/auth';

const ProfileScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const user = useSelector(store => store.auth.user);
  const name = user ? user.name : '';
  const lastname = user ? user.lastname : '';
  const email = user ? user.email : '';
  const language = useSelector(store => store.settings.localeText);

  const [modalNameVisible, setModalNameVisible] = useState(false);
  const [modalEmailVisible, setModalEmailVisible] = useState(false);
  const [inputName, setInputName] = useState(name);
  const [inputEmail, setInputEmail] = useState(name);

  const onPressItem = async ({itemName}) => {
    switch (itemName) {
      case 'name':
        setModalNameVisible(true);
        break;

      case 'email':
        setModalEmailVisible(true);
        break;

      case 'language':
        navigation.navigate('Language');
        break;

      case 'logout':
        dispatch(onLogOut());
        break;

      // case 'switch-account':
      //   navigation.navigate('Account', {accounts});
      //   break;

      default:
        break;
    }
  };

  const getProfileItemValue = itemName => {
    switch (itemName) {
      case 'name':
        return name;

      case 'email':
        return email;

      case 'language':
        return language;

      default:
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title={translations.PROFILE.HEADER_TITLE} />
      <Container>
        <ModalWithInput
          modalVisible={modalNameVisible}
          setModalVisible={setModalNameVisible}
          title={translations.PROFILE.MODAL_TITLE_NAME}
          inputValue={inputName}
          setInputValue={setInputName}
          prevState={name}
          inputPlaceholder={translations.PROFILE.MODAL_PLACEHOLDER_NAME}
          onSuccess={updateUser(user.id, {
            name: inputName,
          })}
        />
        <ModalWithInput
          modalVisible={modalEmailVisible}
          setModalVisible={setModalEmailVisible}
          title={translations.PROFILE.MODAL_TITLE_EMAIL}
          inputValue={inputEmail}
          setInputValue={setInputEmail}
          prevState={email}
          inputPlaceholder={translations.PROFILE.MODAL_PLACEHOLDER_NAME}
          onSuccess={updateUser(user.id, {
            email: inputEmail,
          })}
        />

        <View style={styles.itemListView}>
          {PROFILE_ITEMS.map((item, index) => (
            <ProfileItem
              key={item.text}
              text={translations.getString(`PROFILE.${item.text}`)}
              value={getProfileItemValue(item.itemName)}
              checked={item.checked}
              iconSize={item.iconSize}
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

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // backgroundColor: theme['background-basic-color-1'],
  },

  headerTitle: {
    // fontWeight: theme['font-semi-bold'],
    // fontSize: theme['font-size-large'],
  },
  profileContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    // borderBottomColor: theme['color-border'],
  },

  detailsContainer: {
    flex: 1,
    paddingLeft: 16,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  nameLabel: {
    // fontSize: theme['font-size-medium'],
    // fontWeight: theme['font-medium'],
  },
  emailLabel: {
    paddingTop: 4,
    // fontSize: theme['font-size-small'],
    // fontWeight: theme['font-regular'],
    // color: theme['text-basic-color'],
  },

  itemListView: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    // borderBottomColor: theme['color-border'],
  },

  enabledSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 16,
  },

  sectionText: {
    // fontSize: theme['font-size-medium'],
    // fontWeight: theme['font-semi-bold'],
  },

  aboutView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  aboutImage: {
    width: deviceWidth * 0.82391,
    height: deviceWidth * 0.171,
    aspectRatio: 2,
    resizeMode: 'contain',
  },

  appDescriptionView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  appDescriptionText: {
    // fontSize: theme['font-size-medium'],
  },

  modalContainer: {
    minHeight: 192,
    minWidth: '80%',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  modalInput: {
    flex: 1,
    margin: 2,
  },
  modalBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  modalSave: {
    marginLeft: 20,
  },
});

export default ProfileScreen;
