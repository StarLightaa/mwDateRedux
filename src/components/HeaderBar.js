import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TopNavigation, TopNavigationAction, Icon} from '@ui-kitten/components';

const BackIcon = props => {
  return (
    <Icon {...props} name="arrow-ios-back-outline" height={24} width={24} />
  );
};

const CloseIcon = props => {
  return <Icon {...props} name="close-outline" height={32} width={32} />;
};

const MenuIcon = props => {
  return <Icon {...props} name="funnel-outline" />;
};

const SaveIcon = props => {
  return <Icon {...props} name="checkmark-outline" />;
};

const MoreIcon = props => {
  return <Icon {...props} name="more-horizontal-outline" />;
};

const SettingsIcon = props => {
  return <Icon {...props} name="settings-2-outline" />;
};

class HeaderBar extends Component {
  renderLeftControl = () => {
    const {onBackPress, leftButtonIcon} = this.props;
    if (leftButtonIcon) {
      return <TopNavigationAction icon={CloseIcon} onPress={onBackPress} />;
    }
    return <TopNavigationAction icon={BackIcon} onPress={onBackPress} />;
  };

  renderRightControl = () => {
    const {buttonType, onRightPress} = this.props;
    switch (buttonType) {
      case 'menu':
        return <TopNavigationAction icon={MenuIcon} onPress={onRightPress} />;
      case 'more':
        return <TopNavigationAction icon={MoreIcon} onPress={onRightPress} />;
      case 'save':
        return <TopNavigationAction icon={SaveIcon} onPress={onRightPress} />;
      case 'settings':
        return <TopNavigationAction icon={SettingsIcon} onPress={onRightPress} />;
      default:
        return <TopNavigationAction icon={SaveIcon} onPress={onRightPress} />;
    }
  };

  render() {
    const {title, showLeftButton, alignment, showRightButton} = this.props;

    return (
      <TopNavigation
        title={evaProps => (
          <Text {...evaProps} style={styles.headerTitle}>
            {title}
          </Text>
        )}
        alignment={alignment}
        titleStyle={styles.headerTitle}
        {...(showLeftButton && {accessoryLeft: this.renderLeftControl})}
        {...(showRightButton && {accessoryRight: this.renderRightControl})}
      />
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HeaderBar;
