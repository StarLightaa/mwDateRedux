import React, {Component} from 'react';
import {SafeAreaView, StatusBar, Animated, Easing} from 'react-native';
import NetInfo from '@react-native-community/netinfo';

class OfflineBar extends Component {
  state = {
    isConnected: true,
  };

  constructor() {
    super();
    this.animation = new Animated.Value(0);
  }

  componentDidMount() {
    NetInfo.addEventListener(state => {
      const {isConnected} = state;
      this.setNetworkStatus(isConnected);
    });
  }

  setNetworkStatus = status => {
    this.setState({isConnected: status});
    if (status) {
      this.triggerAnimation();
    }
  };

  // Took Reference from https://egghead.io/lessons/react-create-a-button-shake-animation-in-react-native#/tab-code
  triggerAnimation = () => {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      duration: 800,
      toValue: 4,
      useNativeDriver: true,
      ease: Easing.bounce,
    }).start();
  };

  render() {
    const {isConnected} = this.state;

    return !isConnected ? (
      <SafeAreaView>
        <StatusBar />
        <Animated.Text>Нет соединия с сетью</Animated.Text>
      </SafeAreaView>
    ) : null;
  }
}

export default OfflineBar;
