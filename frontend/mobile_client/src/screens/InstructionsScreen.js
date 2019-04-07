import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class InstructionsScreen extends Component {

  /* 
   * The recipe object will be stored in this.context.renderRecipe
   * Will probably just be a simple case of displaying an image in the <Image> tag
   * Along with some <Text> which you'll need to style
  */
  render() {
    return (
      <View>
        <Text> Instructions Screen </Text>
      </View>
    );
  }
}

InstructionsScreen.contextType = PantryfiedContext;
