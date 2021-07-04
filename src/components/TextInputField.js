import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import {Icon, Input} from '@ui-kitten/components';

const TextInputField = ({
  label,
  placeholder,
  error,
  value,
  onChangeText,
  customStyles,
}) => {
  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

  // const [value, setValue] = React.useState('');

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>{error}</Text>
      </View>
    );
  };

  // const onChange = ({name, value}) => {
  //   setValue(value);
  //   setForm({...form, [name]: value});
  // };

  return (
    <Input
      value={value}
      label={label}
      placeholder={placeholder}
      caption={error && renderCaption}
      onChangeText={onChangeText}
      style={[styles.inputContainer, customStyles]}
      // onChangeText={nextValue => {
      //   onChange({name: 'email', nextValue});
      // }}
      // onChangeText={nextValue => setValue(nextValue)}
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

export default TextInputField;
