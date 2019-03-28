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
    return (
      <View>
        <Text style={{ flex: 2 }}> Recipe Screen </Text>
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

