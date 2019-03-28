import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class InstructionsScreen extends Component {
  render() {
    return (
      <View>
        <Text> Instructions Screen </Text>
      </View>
    );
  }
}

InstructionsScreen.contextType = PantryfiedContext;
