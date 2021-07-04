import React, {useContext} from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

import {useSelector} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';

import {LocalizationContext} from '../localization/LocalizationContext';

const SearchIcon = style => <Icon {...style} name="search" />;
const AnketaIcon = style => <Icon {...style} name="file-text-outline" />;
const ProfileIcon = style => <Icon {...style} name="person" />;
const SettingsIcon = style => <Icon {...style} name="settings" />;

const TabBarComponent = ({eva, navigation, state}) => {
  const {translations} = useContext(LocalizationContext);
  const changeTab = index => {
    const selectedTabRoute = state.routes[index];
    navigation.navigate(selectedTabRoute.name);
  };

  const {index: selectedIndex} = state;

  return (
    <BottomNavigation
      selectedIndex={selectedIndex}
      onSelect={changeTab}
      appearance="noIndicator"
      style={styles.tabBar}>
      <BottomNavigationTab title={translations.BOTTOM_TABS.SEARCH} icon={SearchIcon} />
      <BottomNavigationTab title={translations.BOTTOM_TABS.ANKETA} icon={AnketaIcon} />
      <BottomNavigationTab title={translations.BOTTOM_TABS.PROFILE} icon={ProfileIcon} />
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 1,
    borderTopColor: 'blue',
  },
});

export default TabBarComponent;
