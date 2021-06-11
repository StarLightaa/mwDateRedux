import React from 'react';
import {Button, useTheme, Spinner} from '@ui-kitten/components';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const LoadingIndicator = props => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);

const LoaderButton = ({loading, text, ...customProps}) => {
  return (
    // <Button {...(true && {accessoryLeft: LoadingIndicator})}>
    //   {loading ? null : <Text>{text}</Text>}
    // </Button>
    <Button
      {...customProps}
      style={styles.button}
      appearance="outline"
      accessoryLeft={loading && LoadingIndicator}>
      {text}
    </Button>
  );
};

const propTypes = {
  loading: PropTypes.bool,
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  loading: false,
};

LoaderButton.propTypes = propTypes;
LoaderButton.defaultProps = defaultProps;

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
