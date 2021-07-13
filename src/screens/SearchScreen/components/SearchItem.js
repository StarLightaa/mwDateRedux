import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Text,
  Button,
} from 'react-native';
import {Card, Icon} from '@ui-kitten/components';

import {DEFAULT_IMAGE_URI} from '../../../store/constants/url';

const Footer = props => (
  <View {...props} style={[props.style, styles.footerCardContainer]}>
    <Text style={styles.footerCardMatches}>Совместимость: {props.userMatchProcent}%</Text>
    <TouchableOpacity onPress={props.onMessage}>
      <Icon
        name="message-circle-outline"
        fill="#ccc"
        width={26}
        height={26}
        style={styles.cardLocationIcon}
      />
    </TouchableOpacity>
  </View>
);

const SearchItem = ({
  text,
  value,
  checked,
  iconSize,
  itemType,
  iconName,
  itemName,
  onPressItem,
  userName,
  userAge,
  userCity,
  userStatus,
  userMatchProcent,
  onMessage,
  onCard,
}) => {
  return (
    <Card
      onPress={() => onCard()}
      footer={props => (
        <Footer
          {...props}
          userMatchProcent={userMatchProcent}
          onMessage={onMessage}
        />
      )}>
      <View style={styles.cardBody}>
        <Image
          width={photoDimension}
          height={photoDimension}
          source={{uri: DEFAULT_IMAGE_URI}}
          style={styles.cardImage}
        />
        <View style={styles.cardText}>
          <Text style={styles.cardTextName}>
            {userName} | {userAge}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="pin-outline"
              fill="#ccc"
              width={26}
              height={26}
              style={styles.cardLocationIcon}
            />
            <Text style={styles.cardTextCity}>{userCity}</Text>
          </View>
        </View>
      </View>
      <View style={styles.cardStatus}>
        <Text style={styles.cardStatusText}>{userStatus}</Text>
      </View>
    </Card>
  );
};

export default SearchItem;

const {height, width} = Dimensions.get('screen');
const screenWidth = width - 40;
const gap = screenWidth * 0.05;
const photoDimension = screenWidth * 0.3;

const styles = StyleSheet.create({
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: photoDimension,
    height: photoDimension,
    alignSelf: 'center',
    borderRadius: 10,
    marginRight: 20,
  },
  cardText: {},
  cardTextName: {
    fontSize: 20,
    fontWeight: '700',
  },
  cardTextCity: {
    fontSize: 16,
    color: '#ccc',
  },
  cardLocationIcon: {
    width: 26,
    height: 26,
  },
  cardStatus: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardStatusText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  footerCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerCardMatches: {
    fontSize: 16,
    color: 'green',
  },
});
