import React from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback} from 'react-native';

import {Icon, Input} from '@ui-kitten/components';

const PasswordTextInputField = ({
  label,
  placeholder,
  error,
  value,
  onChangeText,
  customStyles,
}) => {
  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>{error}</Text>
      </View>
    );
  };

  return (
    <Input
      value={value}
      label={label}
      placeholder={placeholder}
      caption={error && renderCaption}
      accessoryRight={renderIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={onChangeText}
      style={[styles.inputContainer, customStyles]}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: 'red',
  },
});

export default PasswordTextInputField;
