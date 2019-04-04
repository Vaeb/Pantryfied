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

  navigateInstructionsPressed() {
    this.props.navigation.navigate("InstructionsScreen");
  }
  render() {
    let toRenderRecipe = JSON.stringify(this.context.renderRecipe);
    return (
      <View>
        <Text> Recipe Screen </Text>
        <Text>{toRenderRecipe}</Text>
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
});

RecipeScreen.contextType = PantryfiedContext;

