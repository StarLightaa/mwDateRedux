import React, {useState, useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
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

import {Button, Icon, Layout, Spinner, Input} from '@ui-kitten/components';
import Container from '../../components/Container';
import TextInputField from '../../components/TextInputField';
import PasswordTextInputField from '../../components/PasswordTextInputField';
import LoaderButton from '../../components/LoaderButton';
import * as Animatable from 'react-native-animatable';

import {doRegister} from '../../store/actions/auth';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isRegistering = useSelector(state => state.auth.isRegistering);
  const registerFirstnameInvalid = useSelector(
    state => state.auth.registerFirstnameError,
  );
  const registerLastNameInvalid = useSelector(
    state => state.auth.registerLastNameError,
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const registerUser = async () => {
    const isRegistered = await dispatch(doRegister(form));
    if (isRegistered) {
      navigation.navigate('Login');
    }
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
        <Text>Создать новый аккаунт</Text>
      </View>

      <TextInputField
        label="Имя"
        placeholder="Введите свое имя"
        error={registerFirstnameInvalid}
        value={firstname}
        onChangeText={value => {
          setForm({...form, ['firstname']: value});
          setFirstname(value);
        }}
      />
      <TextInputField
        label="Фамилия"
        placeholder="Введите свою фамилию"
        error={registerLastNameInvalid}
        value={lastname}
        onChangeText={value => {
          setForm({...form, ['lastname']: value});
          setLastname(value);
        }}
      />

      <TextInputField
        label="Email"
        placeholder="Введите свой email"
        error={registerEmailInvalid}
        value={email}
        onChangeText={value => {
          setForm({...form, ['email']: value});
          setEmail(value);
        }}
      />
      <PasswordTextInputField
        label="Пароль"
        placeholder="Введите свой пароль"
        error={registerPasswordInvalid}
        value={password}
        onChangeText={value => {
          setForm({...form, ['password']: value});
          setPassword(value);
        }}
      />

      <PasswordTextInputField
        label="Подтверждение пароля"
        placeholder="Повторите пароль пожалуйста"
        value={password_confirmation}
        onChangeText={value => {
          setForm({...form, ['password_confirmation']: value});
          setPasswordConfirmation(value);
        }}
      />

      <TouchableOpacity
        style={styles.forgotView}
        onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.textStyle}>Забыли пароль?</Text>
      </TouchableOpacity>

      <LoaderButton
        loading={isRegistering}
        disabled={isRegistering}
        text="Зарегистрировать"
        onPress={() => registerUser()}
        customStyles={styles.actionBtn}
      />

      <TouchableOpacity
        style={[styles.centerView, {marginBottom: 25}]}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.textStyle}>Войти аккаунт</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.centerView}
        onPress={() => navigation.navigate('ChangeLanguage')}>
        <Text style={styles.textStyle}>Сменить язык</Text>
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
