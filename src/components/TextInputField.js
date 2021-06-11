import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

export default function TextInputField(locals) {
  return (
    <View>
      <Text style={styles.label}>{locals.config.label}</Text>
      <TextInput
        style={locals.hasError ? styles.errorInputStyle : styles.inputStyle}
        accessibilityLabel={locals.label}
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        editable={locals.editable}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        onBlur={locals.onBlur}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        onContentSizeChange={locals.onContentSizeChange}
        // placeholderTextColor={theme['text-primary-color']}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        numberOfLines={locals.numberOfLines}
        underlineColorAndroid={locals.underlineColorAndroid}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        selectionState={locals.selectionState}
        onChangeText={value => locals.onChange(value)}
        onChange={locals.onChangeNative}
        placeholder={locals.placeholder}
        value={locals.value}
      />
      <Text style={styles.errorLabel}>{locals.error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textViewError: {},
  label: {},
  errorLabel: {
    textAlign: 'left',
    paddingTop: 2,
    paddingBottom: 2,
    color: 'black',
  },
  inputStyle: {},
  errorInputStyle: {},
});
