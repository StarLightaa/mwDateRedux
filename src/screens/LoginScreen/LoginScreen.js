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

import {Button, Icon, Layout, Spinner} from '@ui-kitten/components';

import {doLogin} from '../../store/actions/auth';

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const isLoggingIn = useSelector(state => state.auth.isLoggingIn);

  useEffect(() => {
    // dispatch(resetAuth());
  }, [dispatch]);

  const loginUser = () => {
    let email = 'test@mail.ru';
    let password = '123456';
    dispatch(doLogin({email, password}));
  };

  const LoadingIndicator = props => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>LoginScreen</Text>
      <Button
        style={styles.button}
        appearance="outline"
        accessoryLeft={LoadingIndicator}
        onPress={() => loginUser()}>
        Log in
      </Button>

      <Button
        style={styles.button}
        appearance="outline"
        onPress={() => navigation.navigate('Register')}>
        Create account
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default LoginScreen;
