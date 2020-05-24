import React from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.loop(
      Animated.timing(this.spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start(this.props.onFinishedAnimating);
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    return (
      <Animated.View
        style={[
          styles.spinner,
          {
            ...this.props.style,
            transform: [{ rotate: spin }],
          },
        ]}
      ></Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  spinner: {
    height: 18,
    width: 18,
    borderWidth: 3,
    borderColor: '#1db853',
    borderRadius: 42 / 2,
    borderBottomColor: 'transparent',
  },
});
