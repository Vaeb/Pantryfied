import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class InstructionsScreen extends Component {

  /* 
   * The recipe object will be stored in this.context.renderRecipe
   * Will probably just be a simple case of displaying an image in the <Image> tag
   * Along with some <Text> which you'll need to style
   * remove the braces from where the comments are in the middle of the JSX when you remove the comments
  */

  // make lists into ListItem and add key fields in App.js when setting renderRecipe
  render() {
    return (
      <View>
        <Text style={styles.nameText}>{this.context.renderRecipe.name}</Text>
        <Text style={styles.headerText}>Ingredients</Text>
        {/* either use ListItem or FlatList for ingredients, they work mostly the same */}
        <Text style={styles.instructionText}>{this.context.renderRecipe.ingredients[0].name}</Text>
        <Text style={styles.headerText}>Instructions</Text>
        {/* not sure what this looks like yet so probably just ignore it */}
        {/* <Text style={styles.instructionText}>{this.context.renderRecipe.directions}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({

      nameText: {
          fontSize: 30,
          color: "#FFFFFF",
          backgroundColor: "#28BAA5",
          textAlign: "center",
          height: 50,
          alignItems: "center",
        },

      instructionText: {
         fontSize: 20,
         color: "black",
      },

      headerText: {
        fontSize: 22,
        color: "black",
        fontWeight: "bold",
      }

});

InstructionsScreen.contextType = PantryfiedContext;
