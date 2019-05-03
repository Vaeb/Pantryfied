import React, { Component } from 'react';
import {
  Text, View, StyleSheet, TouchableOpacity, Image 
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
// import { Button } from '../components/common/Button';

const parseRecipeData = (possibleData, alt, extra) => (possibleData != null ? `${possibleData}${extra != null ? extra : ''}` : alt); // Can't just use || below in case possibleData is 0

// eslint-disable-next-line react/prefer-stateless-function
export default class RecipeScreen extends Component {
  constructor(props) {
    super(props);
    this.navigateInstructionsPressed = this.navigateInstructionsPressed.bind(this);
  }

  componentDidMount() {
    console.log('Mounting recipe screen');
  }

  navigateInstructionsPressed() {
    this.props.navigation.navigate('InstructionsScreen');
  }

  render() {
    console.log('Rendering recipe data');
    // const toRenderRecipe = JSON.stringify(this.context.renderRecipe);
    return (
      <View style={{ flex: 1 }}>
        <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={styles.nameText}>
          {this.context.renderRecipe.name}
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image
            source={{
              uri: parseRecipeData(this.context.renderRecipe.imgUrl, 'http://getdrawings.com/free-icon/free-question-mark-icon-67.png')
            }}
            style={{
              width: 200,
              height: 200
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end'
          }}
        >
          <Text style={styles.descriptionText}>{parseRecipeData(this.context.renderRecipe.description, 'No description available')}</Text>
          <Text style={styles.ratingText}>Rating: {parseRecipeData(this.context.renderRecipe.rating, 'Not available', '/5')}</Text>
          <Text />
          <Text style={styles.infoText}>Calories: {parseRecipeData(this.context.renderRecipe.calories, 'Not available')}</Text>
          <Text style={styles.infoText}>Protein: {parseRecipeData(this.context.renderRecipe.protein, 'Not available', 'g')}</Text>
          <Text style={styles.infoText}>Fat: {parseRecipeData(this.context.renderRecipe.fat, 'Not available', 'g')}</Text>
          <Text style={styles.infoText}>Sodium: {parseRecipeData(this.context.renderRecipe.sodium, 'Not available', 'g')}</Text>
          <Text />
          <TouchableOpacity onPress={this.navigateInstructionsPressed} style={styles.navButton} activeOpacity={0.5}>
            <Text adjustsFontSizeToFit numberOfLines={1} style={styles.navButtonText}>
              View Instructions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navButton: {
    flex: 0,
    backgroundColor: '#1F7C71',
    marginBottom: 10,
    width: 300,
    height: 38,
    alignSelf: 'center',
    paddingHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',

    marginLeft: 30,
    marginRight: 30,
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
