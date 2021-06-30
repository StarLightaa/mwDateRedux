import React, {useState, useContext} from 'react';
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
import TextInputField from '../../components/TextInputField';
import PasswordTextInputField from '../../components/PasswordTextInputField';
import LoaderButton from '../../components/LoaderButton';
import * as Animatable from 'react-native-animatable';

import {doRegister, clearValidation} from '../../store/actions/auth';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const {translations} = useContext(LocalizationContext);

  const isRegistering = useSelector(state => state.auth.isRegistering);
  const registerFirstnameInvalid = useSelector(
    state => state.auth.registerFirstnameError,
  );
  const registerLastNameInvalid = useSelector(
    state => state.auth.registerLastNameError,
  );
  const registerLoginInvalid = useSelector(
    state => state.auth.registerLoginError,
  );
  const registerNameInvalid = useSelector(
    state => state.auth.registerNameError,
  );
  const registerEmailInvalid = useSelector(
    state => state.auth.registerEmailError,
  );
  const registerPasswordInvalid = useSelector(
    state => state.auth.registerPasswordError,
  );
  const registerPasswordConfirmInvalid = useSelector(
    state => state.auth.registerPasswordConfirmationError,
  );

  const [form, setForm] = useState({});
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const registerUser = async () => {
    const isRegistered = await dispatch(doRegister(form));
    if (isRegistered) {
      navigation.navigate('Login');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearValidation());
    }, []),
  );

  const isDisabled = () => {
    if (
      login.trim().length < 1 ||
      name.trim().length < 1 ||
      email.trim().length < 1 ||
      password.trim().length < 1 ||
      password_confirmation.trim().length < 1
    ) {
      return true;
    }
    return false;
  };

  return (
    <Container>
      <View style={styles.logoWrapper}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>

      <View style={styles.screenTitle}>
        <Text>{translations.REGISTER.TITLE}</Text>
      </View>

      <TextInputField
        label={translations.REGISTER.LOGIN_LABEL}
        placeholder={translations.REGISTER.LOGIN_PLACEHOLDER}
        error={registerLoginInvalid}
        value={login}
        onChangeText={value => {
          setForm({...form, ['login']: value});
          setLogin(value);
        }}
      />

      <TextInputField
        label={translations.REGISTER.NAME_LABEL}
        placeholder={translations.REGISTER.NAME_PLACEHOLDER}
        error={registerNameInvalid}
        value={name}
        onChangeText={value => {
          setForm({...form, ['name']: value});
          setName(value);
        }}
      />

      <TextInputField
        label={translations.REGISTER.EMAIL_LABEL}
        placeholder={translations.REGISTER.EMAIL_PLACEHOLDER}
        error={registerEmailInvalid}
        value={email}
        onChangeText={value => {
          setForm({...form, ['email']: value});
          setEmail(value);
        }}
      />
      <PasswordTextInputField
        label={translations.REGISTER.PASSWORD_LABEL}
        placeholder={translations.REGISTER.PASSWORD_PLACEHOLDER}
        error={registerPasswordInvalid}
        value={password}
        onChangeText={value => {
          setForm({...form, ['password']: value});
          setPassword(value);
        }}
      />

      <PasswordTextInputField
        label={translations.REGISTER.CONFIRM_PASSWORD_LABEL}
        placeholder={translations.REGISTER.CONFIRM_PASSWORD_PLACEHOLDER}
        value={password_confirmation}
        onChangeText={value => {
          setForm({...form, ['password_confirmation']: value});
          setPasswordConfirmation(value);
        }}
      />

      <LoaderButton
        loading={isRegistering}
        disabled={isRegistering || isDisabled()}
        text={translations.REGISTER.REGISTER}
        onPress={() => registerUser()}
        customStyles={styles.actionBtn}
      />

      <TouchableOpacity
        style={[styles.centerView, {marginBottom: 25}]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textStyle}>
          {translations.REGISTER.GO_TO_LOGIN}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerView}
        onPress={() => navigation.navigate('Language')}>
        <Text style={styles.textStyle}>
          {translations.REGISTER.CHANGE_LANGUAGE}
        </Text>
      </TouchableOpacity>
    </Container>
  );
};

const {height} = Dimensions.get('screen');
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default RegisterScreen;
