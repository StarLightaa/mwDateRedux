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

import {doLogin} from '../../store/actions/auth';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const isLoggingIn = useSelector(state => state.auth.isLoggingIn);

  const loginEmailInvalid = useSelector(state => state.auth.loginEmailError);
  const loginPasswordInvalid = useSelector(
    state => state.auth.loginPasswordError,
  );

  useEffect(() => {
    // dispatch(resetAuth());
  }, [dispatch]);

  const [form, setForm] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    await dispatch(doLogin(form));
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
        <Text>Login to your account</Text>
      </View>

      <TextInputField
        label="Email"
        placeholder="Введите свой email"
        error={loginEmailInvalid}
        value={email}
        onChangeText={value => {
          setForm({...form, ['email']: value});
          setEmail(value);
        }}
      />
      <PasswordTextInputField
        label="Пароль"
        placeholder="Введите свой пароль"
        error={loginPasswordInvalid}
        value={password}
        onChangeText={value => {
          setForm({...form, ['password']: value});
          setPassword(value);
        }}
      />

      <TouchableOpacity
        style={styles.forgotView}
        onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.textStyle}>Забыли пароль?</Text>
      </TouchableOpacity>

      <LoaderButton
        loading={isLoggingIn}
        disabled={isLoggingIn}
        text="Войти"
        onPress={() => loginUser()}
        customStyles={styles.actionBtn}
      />

      <TouchableOpacity
        style={[styles.centerView, {marginBottom: 25}]}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.textStyle}>Создать аккаунт</Text>
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
export default LoginScreen;
