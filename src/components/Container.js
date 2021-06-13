import React from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';

const Container = ({style, children}) => {
  return (
    <ScrollView>
      <View style={[styles.container, style]}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default Container;
