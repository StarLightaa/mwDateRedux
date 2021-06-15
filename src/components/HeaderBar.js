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

const MoreIcon = props => {
  return <Icon {...props} name="more-horizontal-outline" />;
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
    return (
      <TopNavigationAction
        icon={buttonType === 'menu' ? MenuIcon : MoreIcon}
        onPress={onRightPress}
      />
    );
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
