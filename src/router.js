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
import ResetPasswordByEmail from './screens/ResetPasswordScreen/ResetPasswordByEmail';
import ResetPasswordByOldPassword from './screens/ResetPasswordScreen/ResetPasswordByOldPassword';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';
import BirthdayScreen from './screens/ProfileScreen/screens/BirthdayScreen';
import CityScreen from './screens/ProfileScreen/screens/CityScreen';
import SexScreen from './screens/ProfileScreen/screens/SexScreen';

import SearchScreen from './screens/SearchScreen/SearchScreen';
import LanguageScreen from './screens/LanguageScreen/LanguageScreen';

import MyAnketaScreen from './screens/AnketaScreen/MyAnketaScreen';
import AnketaScreen from './screens/AnketaScreen/AnketaScreen';
import HairColorScreen from './screens/AnketaScreen/screens/HairColorScreen';
import HobbiesScreen from './screens/AnketaScreen/screens/HobbiesScreen';
import EditRadioAnketaScreen from './screens/AnketaScreen/screens/EditRadioAnketaScreen';

import MessagesScreen from './screens/Messages/MessagesScreen';
import ChatScreen from './screens/Messages/ChatScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SearchStack = () => (
  <Stack.Navigator initialRouteName="Search">
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="Anketa" component={AnketaScreen} />
  </Stack.Navigator>
);

const MessageStack = () => (
  <Stack.Navigator initialRouteName="Messages">
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={({route}) => ({
        title: route.params.userName,
        headerBackTitleVisible: false,
      })}
    />
  </Stack.Navigator>
);

const AnketaStack = () => (
  <Stack.Navigator initialRouteName="MyAnketa" headerMode="none">
    <Stack.Screen name="MyAnketa" component={MyAnketaScreen} />

    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Birthday" component={BirthdayScreen} />
    <Stack.Screen name="City" component={CityScreen} />
    <Stack.Screen name="Sex" component={SexScreen} />
    <Stack.Screen name="HairColor" component={HairColorScreen} />
    <Stack.Screen name="Hobbies" component={HobbiesScreen} />
    <Stack.Screen name="EditAnketa" component={EditRadioAnketaScreen} />

    <Stack.Screen name="Language" component={LanguageScreen} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile" headerMode="none">
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen
      name="ResetPasswordByOldPassword"
      component={ResetPasswordByOldPassword}
    />
    <Stack.Screen
      name="ResetPasswordByEmail"
      component={ResetPasswordByEmail}
    />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Language" component={LanguageScreen} />
  </Stack.Navigator>
);

const TabStack = () => (
  <Tab.Navigator
    initialRouteName="Messages"
    tabBar={props => <TabBar {...props} />}>
    <Tab.Screen name="Search" component={SearchStack} />
    <Tab.Screen name="Messages" component={MessageStack} />
    <Tab.Screen name="MyAnketa" component={AnketaStack} />
  </Tab.Navigator>
);

export const config = {
  screens: {
    ResetPasswordByEmail: {
      path: 'reset/:token/:email',
      parse: {
        token: token => `${token}`,
        email: email => `${email}`,
      },
    },
  },
};

const linking = {
  prefixes: ['mwdate://'],
  config,
};

const App = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled>
      <SafeAreaView style={styles.container}>
        <NavigationContainer linking={linking}>
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
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPasswordScreen}
                />
                <Stack.Screen
                  name="ResetPasswordByEmail"
                  component={ResetPasswordByEmail}
                />
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
