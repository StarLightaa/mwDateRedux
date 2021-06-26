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
import LoaderButton from '../../../components/LoaderButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const BirthdayScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const user = useSelector(store => store.auth.user);

  const [birthday, setBirthday] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(true);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar title={translations.BIRTHDAY.HEADER_TITLE} showLeftButton onBackPress={goBack} />
      <Container>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}>
          <Text>{moment(birthday).format('DD.MM.YYYY')}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            maximumDate={new Date()}
            value={birthday}
            display="default"
            onChange={(event, selectedDate) => {
              //   console.log(moment(selectedDate).format('DD.MM.YYYY'));
              setBirthday(selectedDate || birthday);
              setShowDatePicker(false);
            }}
          />
        )}
        <LoaderButton
          loading={false}
          disabled={false}
          text={translations.BIRTHDAY.SAVE_BTN}
          onPress={() => console.log('123')}
          customStyles={styles.actionBtn}
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
});

export default BirthdayScreen;
