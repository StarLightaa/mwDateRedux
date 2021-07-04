import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Radio} from '@ui-kitten/components';

const RadioButton = ({title, item, onCheckedChange, isChecked}) => {
  return (
    <TouchableOpacity
      style={styles.itemView}
      onPress={() => onCheckedChange({item})}>
      <View style={styles.textView}>
        <Text style={styles.text}>{title}</Text>
      </View>

      <View style={styles.radioView}>
        <Radio checked={isChecked} onChange={() => onCheckedChange({item})} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 8,
  },
  iconView: {
    flex: 1,
  },
  icon: {
    width: 16,
    height: 16,
  },
  textView: {
    flex: 8,
  },
  text: {
    color: '#8492a6',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'left',
  },
  radioView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default RadioButton;
