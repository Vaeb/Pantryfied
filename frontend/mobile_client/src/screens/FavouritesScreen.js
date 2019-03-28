import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class FavouritesScreen extends Component {
  render() {
    return (
      <View>
        <Text> Favourites Screen </Text>
      </View>
    );
  }
}

FavouritesScreen.contextType = PantryfiedContext;
