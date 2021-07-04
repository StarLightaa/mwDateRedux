import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Toggle, Divider, Icon} from '@ui-kitten/components';

const ListItem = ({
  text,
  value,
  checked,
  iconSize,
  itemType,
  iconName,
  itemName,
  onPressItem,
}) => {
  return (
    <React.Fragment>
      <TouchableOpacity
        style={[styles.section, styles.enabledSection]}
        onPress={() => onPressItem({itemName})}>
        <Text style={styles.sectionText}>{text}</Text>
        <View style={styles.sectionRight}>
          <Text style={styles.sectionValue}>{value}</Text>
          <Icon
            name={iconName}
            //   fill={theme['color-primary-default']}
            width={iconSize}
            height={iconSize}
            style={styles.sectionIcon}
          />
        </View>
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 16,
  },
  enabledSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 16,
  },

  sectionText: {
    // fontSize: theme['font-size-small'],
    // fontWeight: theme['font-medium'],
  },
  sectionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginLeft: 15
  }
});
