import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';

// eslint-disable-next-line react/prefer-stateless-function
export default class RecipeScreen extends Component {
  constructor(props) {
    super(props);
    this.navigateInstructionsPressed = this.navigateInstructionsPressed.bind(this);
  }

  /*
   * The recipe object will be stored in this.context.renderRecipe
   * Not sure what the object layout is yet but it will probably be in disc by the time you do this
   * This page will probably just consist of mostly <Text> tags to display all of the info, but possibly an <Image> as well
   * Will mainly just be styling that needs to be done, theres a button already on the screen which you can design
   * By passing in the arguments in components/common/Button.js that you can see
   * The component is quite customisable so shouldnt be hard to understand, the navigation to the instructions screen is already done
   * So you dont have to worry about that
   */

  navigateInstructionsPressed() {
    this.props.navigation.navigate("InstructionsScreen");
  }
  render() {
    let toRenderRecipe = JSON.stringify(this.context.renderRecipe);
    return (
      <View>
        <Text> Recipe Screen </Text>
        <Text>{toRenderRecipe}</Text>
        <Text>{this.context.renderRecipe.description}</Text>
        <Button onPress={this.navigateInstructionsPressed} inheritStyle={styles.navButton} inheritTextStyle={styles.navButtonText}>
          Navigate to Instructions Screen
        </Button>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  navButton: {
    flex: 1,
  },
  navButtonText: {
    fontSize: 18,
  },

  descriptionText: {
    fontSize: 18,
  }
});

RecipeScreen.contextType = PantryfiedContext;

