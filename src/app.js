import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Layout, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {store, persistor} from './store';
import Router from './router';
import {LocalizationProvider} from './localization/LocalizationContext';

import NoNetworkBar from './components/NoNetworkBar';

export default class MwDate extends Component {
  componentDidMount() {
    console.log('MwDate init');
    // ErrorHelper.init();
    // // To hide splash screen
    // SplashScreen.hide();
    // if (Platform.OS === 'android') {
    //   BackgroundColor.setColor('#FFFFFF');
    // }
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonClick,
    // );
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonClick,
    // );
  }

  // handleBackButtonClick = () => {
  //   Alert.alert(
  //     i18n.t('EXIT.TITLE'),
  //     i18n.t('EXIT.SUBTITLE'),
  //     [
  //       {
  //         text: i18n.t('EXIT.CANCEL'),
  //         onPress: () => {},
  //         style: 'cancel',
  //       },
  //       {text: i18n.t('EXIT.OK'), onPress: () => BackHandler.exitApp()},
  //     ],
  //     {cancelable: false},
  //   );
  //   return true;
  // };

  render() {
    return (
      <React.Fragment>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <LocalizationProvider>
                <NoNetworkBar />
                <Router />
              </LocalizationProvider>
            </PersistGate>
          </Provider>
        </ApplicationProvider>
      </React.Fragment>
    );
  }
}
