import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

import {useSelector} from 'react-redux';
import {StyleSheet, View, Text} from 'react-native';

const ConversationIcon = style => <Icon {...style} name="message-circle" />;
const SettingsIcon = style => <Icon {...style} name="settings" />;

const TabBarComponent = ({eva, navigation, state}) => {
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
      <BottomNavigationTab title="Search" icon={ConversationIcon} />
      <BottomNavigationTab title="Profile" icon={SettingsIcon} />
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
