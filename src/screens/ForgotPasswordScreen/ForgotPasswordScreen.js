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
  sendResetMail,
  clearValidation,
  tryGetResetPasswordToken,
  clearResetMail,
} from '../../store/actions/auth';

const LoadingIndicator = props => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const ForgotPasswordScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {translations} = useContext(LocalizationContext);

  const isSendingResetMail = useSelector(
    state => state.auth.isSendingResetMail,
  );
  const user = useSelector(store => store.auth.user);
  const emailExists = user ? true : false;

  const sendResetMailInvalid = useSelector(
    state => state.auth.sendResetMailError,
  );
  const resetMail = useSelector(state => state.auth.resetMail);
  const resetPasswordToken = useSelector(
    state => state.auth.resetPasswordToken,
  );

  const [mailed, setMailed] = useState(false);

  const [form, setForm] = useState({});
  const [email, setEmail] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      dispatch(clearValidation());
      if (resetMail === null) {
        return;
      }
      setMailed(false);
    }, []),
  );

  const sendMail = async () => {
    console.log('email', email);
    const success = await dispatch(sendResetMail(form));
    setMailed(success);
    setForm({});
  };

  const clearMail = () => {
    dispatch(clearValidation());
    const success = dispatch(clearResetMail(resetMail));
    setMailed(false);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const isDisabled = () => {
    return email.trim().length < 1 ? true : false;
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        title={translations.RESTORE_PASSWORD.RESET_HEADER_TITLE}
        showLeftButton
        onBackPress={goBack}
      />
      <Container>
        <>
          {!mailed ? (
            <View>
              <View>
                <Text style={styles.title}>
                  {translations.RESTORE_PASSWORD.TITLE}
                </Text>
              </View>
              <View>
                <Text style={styles.description}>
                  {translations.RESTORE_PASSWORD.DESCRIPTION}
                </Text>
              </View>

              <TextInputField
                label={translations.RESTORE_PASSWORD.EMAIL_LABEL}
                placeholder={translations.RESTORE_PASSWORD.EMAIL_PLACEHOLDER}
                error={sendResetMailInvalid}
                value={email}
                onChangeText={value => {
                  setForm({...form, ['email']: value});
                  setEmail(value);
                }}
              />

              <LoaderButton
                loading={isSendingResetMail}
                disabled={isSendingResetMail || isDisabled()}
                text={translations.RESTORE_PASSWORD.SEND_MAIL}
                onPress={() => sendMail()}
                customStyles={styles.actionBtn}
              />
            </View>
          ) : (
            <View>
              <Text style={styles.description}>
                {translations.RESTORE_PASSWORD.MAIL_SENDED}
              </Text>
            </View>
          )}
        </>
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
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: '#8492a6',
  },
});

export default ForgotPasswordScreen;
