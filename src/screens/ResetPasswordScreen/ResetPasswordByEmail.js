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

import {
  updatePasswordByEmail,
  clearValidation,
  clearResetMail,
  doLogin,
} from '../../store/actions/auth';

const ResetPasswordScreen = ({navigation, route}) => {
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

  const resetMail = useSelector(state => state.auth.resetMail);

  const resetPasswordToken = useSelector(
    state => state.auth.resetPasswordToken,
  );

  const user = useSelector(state => state.auth.user);

  const [form, setForm] = useState({
    reset_token: resetPasswordToken,
    email: resetMail,
  });
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setForm({
        ...form,
        ['email']: route.params.email,
        ['reset_token']: route.params.token,
      });
      dispatch(clearValidation());
    }, []),
  );

  const goBack = () => {
    navigation.navigate('Login');
  };

  const goNext = () => {
    if (user) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('Login');
    }
  };

  const isDisabled = () => {
    if (newPassword.trim().length < 1 || passwordConfirm.trim().length < 1) {
      return true
    }
    return false;
  };

  const clearMail = () => {
    dispatch(clearValidation());
    dispatch(clearResetMail(resetMail));
    navigation.navigate('ForgotPassword');
  };

  const changePassword = async () => {
    const success = await dispatch(updatePasswordByEmail(form));
    if (success) {
      dispatch(doLogin(form));
      goNext();
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
        <PasswordTextInputField
          label={translations.RESTORE_PASSWORD.NEW_PASSWORD_LABEL}
          placeholder={translations.RESTORE_PASSWORD.NEW_PASSWORD_PLACEHOLDER}
          error={changePasswordNewPasswordInvalid}
          value={newPassword}
          onChangeText={value => {
            setForm({...form, ['new_password']: value, ['password']: value});
            setNewPassword(value);
          }}
        />

        <PasswordTextInputField
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
          disabled={isChangingPassword || isDisabled()}
          text={translations.RESTORE_PASSWORD.RESET_PASSWORD_BTN}
          onPress={() => changePassword()}
          customStyles={styles.actionBtn}
        />
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
