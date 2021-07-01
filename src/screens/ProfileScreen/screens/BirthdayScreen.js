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
import Container from '../../../components/Container';
import ModalUnsavedData from '../../../components/ModalUnsavedData';
import DatePicker from 'react-native-date-picker';

import moment from 'moment';

import {updateUser} from '../../../store/actions/auth';

const BirthdayScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const user = useSelector(store => store.auth.user);
  const locale = useSelector(store => store.settings.localeValue);

  const [birthday, setBirthday] = useState(
    user.birthday ? new Date(user.birthday) : new Date(),
  );

  const [edited, setEdited] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onDateChange = value => {
    setBirthday(value);
    setEdited(true);
    console.log(value);
    console.log(birthday);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const goBackModal = () => {
    if (edited) {
      setModalVisible(true);
      return;
    }
    navigation.goBack();
  };

  const saveData = () => {
    dispatch(
      updateUser({
        birthday,
      }),
    );
    setEdited(false);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={translations.BIRTHDAY.HEADER_TITLE}
        showLeftButton
        showRightButton
        onBackPress={goBackModal}
        onRightPress={saveData}
      />
      <Container>
        <ModalUnsavedData
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          title={translations.MODAL_UNSAVED.TITLE}
          description={translations.MODAL_UNSAVED.DESCRIPTION}
          onSuccess={() => {
            setModalVisible(false);
            setEdited(false);
            goBack();
          }}
        />
        <View>
          <Text style={styles.birthdayLabel}>
            {moment(birthday).format('DD.MM.YYYY')}
          </Text>
        </View>

        <DatePicker
          date={birthday}
          mode="date"
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date()}
          androidVariant="nativeAndroid"
          locale={locale}
          onDateChange={onDateChange}
        />
      </Container>
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
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
  },
});

export default BirthdayScreen;
