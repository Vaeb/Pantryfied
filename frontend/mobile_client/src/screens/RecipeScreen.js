import React, { Component } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Image 
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
// import { Button } from '../components/common/Button';

// eslint-disable-next-line react/prefer-stateless-function
export default class RecipeScreen extends Component {
  constructor(props) {
    super(props);
    this.navigateInstructionsPressed = this.navigateInstructionsPressed.bind(this);
  }

  componentDidMount() {
    console.log(JSON.stringify(this.context.renderRecipe));
  }

  navigateInstructionsPressed() {
    this.props.navigation.navigate('InstructionsScreen');
  }

  render() {
    const toRenderRecipe = JSON.stringify(this.context.renderRecipe);
    return (
      <View>
        <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={styles.nameText}>
          {this.context.renderRecipe.name}
        </Text>
        <Image source={{ uri: this.context.renderRecipe.imgUrl }} style={{ width: 200, height: 200 }} />
        <Text style={styles.descriptionText}>{this.context.renderRecipe.description}</Text>
        <Text style={styles.ratingText}>Rating: {this.context.renderRecipe.rating}/5</Text>
        <Text />
        <Text style={styles.infoText}>Calories: {this.context.renderRecipe.calories}</Text>
        <Text style={styles.infoText}>Protein: {this.context.renderRecipe.protein}g</Text>
        <Text style={styles.infoText}>Fat: {this.context.renderRecipe.fat}g</Text>
        <Text style={styles.infoText}>Sodium: {this.context.renderRecipe.sodium}g</Text>
        <Text />
        <TouchableOpacity onPress={this.navigateInstructionsPressed} style={styles.navButton} activeOpacity={0.5}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.navButtonText}>
            View Instructions
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navButton: {
    flex: 1,
    backgroundColor: '#1F7C71',
    marginBottom: 10,
    width: 300,
    alignSelf: 'center',
    paddingHorizontal: 50,

    paddingTop: 5,
    paddingBottom: 30,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#1F7C71',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#1F7C71'
  },

  navButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    textAlign: 'center'
  },

  descriptionText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  nameText: {
    fontSize: 25,

    color: '#FFFFFF',
    backgroundColor: '#28BAA5',
    height: 50,
    alignItems: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },

  ratingText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'black'
  },

  infoText: {
    fontSize: 22,
    textAlign: 'center',
    color: 'black'
  }
});

RecipeScreen.contextType = PantryfiedContext;
