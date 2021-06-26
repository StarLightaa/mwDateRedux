import React, {useEffect, useState, Fragment} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import TabBar from './components/TabBar';
import WelcomeScreen from './screens/WelcomeScreen/WelcomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen/ForgotPasswordScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen/ResetPasswordScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import BirthdayScreen from './screens/ProfileScreen/screens/BirthdayScreen';
import SearchScreen from './screens/SearchScreen/SearchScreen';
import LanguageScreen from './screens/LanguageScreen/LanguageScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen name="Search" component={SearchScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" headerMode="none">
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Language" component={LanguageScreen} />
    <Stack.Screen name="Birthday" component={BirthdayScreen} />
  </Stack.Navigator>
);

const TabStack = () => (
  <Tab.Navigator
    initialRouteName="Profile"
    tabBar={props => <TabBar {...props} />}>
    <Tab.Screen name="Search" component={SearchStack} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator headerMode={'none'} initialRouteName={'Login'}>
            {isLoggedIn ? (
              <Fragment>
                <Stack.Screen name="Tab" component={TabStack} />
              </Fragment>
            ) : (
              <Fragment>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
                <Stack.Screen name="Language" component={LanguageScreen} />
                {/* <Stack.Screen
                  name="ConfigureURL"
                  component={ConfigureURLScreen}
                />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="ResetPassword" component={ResetPassword} />
                <Stack.Screen
                  name="ConversationList"
                  component={ConversationList}
                />
                <Stack.Screen name="Language" component={LanguageScreen} /> */}
              </Fragment>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
