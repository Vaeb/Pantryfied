import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';
import {Image} from 'react-native' ;

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
        <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={styles.nameText}>{this.context.renderRecipe.title}</Text>
        <Image
            source={{uri: this.context.renderRecipe.imgUrl}}
            style={{width: 200, height: 200,}}
        /> //Display the image for the recipe with height and width 200 from the recipe object in the database
        <Text style={styles.directionHeading}>Directions</Text> //Heading with text Directions
        <Text style={styles.directionText}>{this.context.renderRecipe.directions}</Text> //Display the directions for the recipe
        {/* either use ListItem or FlatList for ingredients, they work mostly the same */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
    nameText: { //make the title central at the top with a black background
        fontSize: 25,

        color: "#FFFFFF",
        backgroundColor: "#28BAA5",
        height: 50,
        alignItems: "center",
        textAlign: "center",
        textAlignVertical:"center"
    },

    directionHeading: {
        fontSize: 20,
        fontWeight: "bold"
    },

    directionText: {
        fontSize: 18
    },
});

InstructionsScreen.contextType = PantryfiedContext;
