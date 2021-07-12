import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Toggle, Divider, Icon} from '@ui-kitten/components';

import {LocalizationContext} from '../localization/LocalizationContext';

const ListItem = ({
  text,
  value,
  checked,
  iconSize,
  itemType,
  iconName,
  itemTitle,
  itemValue,
  onPressItem,
}) => {
  const {translations} = useContext(LocalizationContext);

  return (
    <React.Fragment>
      <TouchableOpacity
        style={[styles.section, styles.enabledSection]}
        onPress={() => onPressItem({itemTitle, itemValue})}>
        <Text style={styles.sectionText}>{text}</Text>
        {value ? (
          <Text style={styles.sectionValue}>{value}</Text>
        ) : (
          <Text style={[styles.sectionValue, {color:'green'}]}>Добавить</Text>
        )}
        <Icon
          name={iconName || 'chevron-right-outline'}
          //   fill={theme['color-primary-default']}
          width={iconSize || 26}
          height={iconSize || 26}
          style={styles.sectionIcon}
        />
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  section: {
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionText: {
    width: '47%',
    // fontSize: theme['font-size-small'],
    // fontWeight: theme['font-medium'],
  },
  sectionValue: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
  },
  sectionIcon: {},
});
