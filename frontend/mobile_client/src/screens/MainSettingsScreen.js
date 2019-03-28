import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class MainSettingsScreen extends Component {
  render() {
    return (
      <View>
        <Text> MainSettings Screen </Text>
      </View>
    );
  }
}

MainSettingsScreen.contextType = PantryfiedContext;
