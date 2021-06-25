import React, {useState, useEffect, useContext} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
} from 'react-native';

import {LocalizationContext} from '../../localization/LocalizationContext';

import {Button, Icon, Layout, Spinner, Input} from '@ui-kitten/components';
import Container from '../../components/Container';
import HeaderBar from '../../components/HeaderBar';
import TextInputField from '../../components/TextInputField';
import PasswordTextInputField from '../../components/PasswordTextInputField';
import LoaderButton from '../../components/LoaderButton';
import * as Animatable from 'react-native-animatable';

import {updatePassword, clearValidation} from '../../store/actions/auth';

const ResetPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const isChangingPassword = useSelector(
    state => state.auth.isChangingPassword,
  );
  const changePasswordCurrentPasswordInvalid = useSelector(
    state => state.auth.changePasswordCurrentPasswordError,
  );
  const changePasswordNewPasswordInvalid = useSelector(
    state => state.auth.changePasswordNewPasswordError,
  );
  const changePasswordPasswordConfirmInvalid = useSelector(
    state => state.auth.changePasswordPasswordConfirmError,
  );

  const [form, setForm] = useState({});
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearValidation());
    }, []),
  );

  const goBack = () => {
    navigation.goBack();
  };

  const changePassword = async () => {
    const success = await dispatch(updatePassword(form));
    if (success) {
      goBack();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={translations.RESTORE_PASSWORD.HEADER_TITLE}
        showLeftButton
        onBackPress={goBack}
      />
      <Container>
        <TextInputField
          label={translations.RESTORE_PASSWORD.CURRENT_PASSWORD_LABEL}
          placeholder={
            translations.RESTORE_PASSWORD.CURRENT_PASSWORD_PLACEHOLDER
          }
          error={changePasswordCurrentPasswordInvalid}
          value={oldPassword}
          onChangeText={value => {
            setForm({...form, ['current_password']: value});
            setOldPassword(value);
          }}
        />

        <TextInputField
          label={translations.RESTORE_PASSWORD.NEW_PASSWORD_LABEL}
          placeholder={translations.RESTORE_PASSWORD.NEW_PASSWORD_PLACEHOLDER}
          error={changePasswordNewPasswordInvalid}
          value={newPassword}
          onChangeText={value => {
            setForm({...form, ['new_password']: value});
            setNewPassword(value);
          }}
        />

        <TextInputField
          label={translations.RESTORE_PASSWORD.NEW_PASSWORD_CONFIRM_LABEL}
          placeholder={
            translations.RESTORE_PASSWORD.NEW_PASSWORD_CONFIRM_PLACEHOLDER
          }
          error={changePasswordPasswordConfirmInvalid}
          value={passwordConfirm}
          onChangeText={value => {
            setForm({...form, ['new_password_confirmation']: value});
            setPasswordConfirm(value);
          }}
        />

        <LoaderButton
          loading={isChangingPassword}
          disabled={isChangingPassword}
          text={translations.RESTORE_PASSWORD.CHANGE_PASSWORD_BTN}
          onPress={() => changePassword()}
          customStyles={styles.actionBtn}
        />

        <TouchableOpacity
          style={[styles.centerView, {marginBottom: 25}]}
          onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.textStyle}>
            {translations.RESTORE_PASSWORD.FORGOT_PASSWORD}
          </Text>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  screenTitle: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  formView: {
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: Dimensions.get('window').height * 0.02,
  },
  loginButtonView: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotView: {
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: 15,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 12,
    color: '#8492a6',
    fontWeight: '500',
  },
  actionBtn: {
    marginBottom: 25,
  },
});

export default ResetPasswordScreen;
