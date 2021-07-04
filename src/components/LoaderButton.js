import React from 'react';
import {Button, useTheme, Spinner} from '@ui-kitten/components';
import {View} from 'react-native';

const LoadingIndicator = props => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const LoaderButton = ({
  loading,
  disabled,
  text,
  customStyles,
  ...customProps
}) => {
  return (
    <Button
      {...customProps}
      disabled={disabled}
      style={[styles.button, customStyles]}
      appearance="outline"
      accessoryLeft={loading && LoadingIndicator}>
      {text}
    </Button>
  );
};

const styles = theme => ({
  button: {
    margin: 2,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoaderButton;
