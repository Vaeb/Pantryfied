import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class MainSettingsScreen extends Component {

  /*
   * This will probably just be a <FlatList> of buttons, dont worry about the navigation yet, just get it looking decent
   * and then ill give you some more pages to add in once we decide what settings there are
   */
  render() {
    return (
      <View>
        <Text> MainSettings Screen </Text>
      </View>
    );
  }
}

MainSettingsScreen.contextType = PantryfiedContext;
