import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Toggle, Divider, Icon} from '@ui-kitten/components';

const ProfileItem = ({
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
            fill="blue"
            //   fill={theme['color-primary-default']}
            width={26}
            height={26}
          />
        </View>
      </TouchableOpacity>
      <Divider />
    </React.Fragment>
  );
};

export default ProfileItem;

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
});
