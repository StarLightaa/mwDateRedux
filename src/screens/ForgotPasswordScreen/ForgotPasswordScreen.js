import React, {useState, useEffect, useContext} from 'react';
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

import {LocalizationContext} from '../../localization/LocalizationContext';

import {Button, Icon, Layout, Spinner, Input} from '@ui-kitten/components';
import Container from '../../components/Container';
import TextInputField from '../../components/TextInputField';
import PasswordTextInputField from '../../components/PasswordTextInputField';
import LoaderButton from '../../components/LoaderButton';
import * as Animatable from 'react-native-animatable';

const ForgotPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const isLoggingIn = useSelector(state => state.auth.isLoggingIn);

  const loginEmailInvalid = useSelector(state => state.auth.loginEmailError);

  const [form, setForm] = useState({});
  const [email, setEmail] = useState('');

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
        <Text>{translations.RESTORE_PASSWORD.TITLE}</Text>
      </View>

      <TextInputField
        label={translations.RESTORE_PASSWORD.EMAIL_LABEL}
        placeholder={translations.RESTORE_PASSWORD.EMAIL_PLACEHOLDER}
        error={loginEmailInvalid}
        value={email}
        onChangeText={value => {
          setForm({...form, ['email']: value});
          setEmail(value);
        }}
      />

      <LoaderButton
        loading={isLoggingIn}
        disabled={isLoggingIn}
        text={translations.RESTORE_PASSWORD.RESTORE}
        onPress={() => console.log('TODO')}
        customStyles={styles.actionBtn}
      />

      <TouchableOpacity
        style={[styles.centerView, {marginBottom: 25}]}
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.textStyle}>
          {translations.RESTORE_PASSWORD.GO_TO_LOGIN}
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

export default ForgotPasswordScreen;
