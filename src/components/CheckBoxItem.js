import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {CheckBox} from '@ui-kitten/components';

const CheckBoxItem = ({title, item, onCheckedChange, isChecked}) => {
  return (
    <TouchableOpacity
      style={styles.itemView}
      onPress={() => onCheckedChange({item})}>
      <View style={styles.textView}>
        <Text style={styles.text}>{title}</Text>
      </View>

      <View style={styles.checkBoxView}>
        <CheckBox checked={isChecked} onChange={() => onCheckedChange({item})} />
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
  checkBoxView: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default CheckBoxItem;
