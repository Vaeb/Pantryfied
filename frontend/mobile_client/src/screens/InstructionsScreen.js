import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, FlatList } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';


// eslint-disable-next-line react/prefer-stateless-function
export default class InstructionsScreen extends Component {


  componentDidMount() {
    console.log("Instructions: ", this.context.renderRecipe);
  }

  // make lists into ListItem and add key fields in App.js when setting renderRecipe
  render() {
    return (
      <View>
        <Text allowFontScaling adjustsFontSizeToFit numberOfLines={1} style={styles.nameText}>{this.context.renderRecipe.title}</Text>
        <Image
            source={{uri: this.context.renderRecipe.imgUrl}}
            style={{width: 200, height: 200,}}
        />
        <Text style={styles.directionHeading}>Ingredients</Text>
            <FlatList
                data={this.context.renderRecipe.quantities}
                renderItem={({ item }) => <Text style={styles.directionText}>{item.quantity}x {item.ingredient.name}</Text>}
            />
        <Text style={styles.directionHeading}>Directions</Text>
        <FlatList
            data={this.context.renderRecipe.steps}
            renderItem={({ item }) => <Text style={styles.directionText}>{item.step}</Text>}
        />
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
        textAlignVertical:"center",
    },

    directionHeading: {
        fontSize: 20,
        fontWeight: "bold",
    },

    directionText: {
        fontSize: 15,
    },
});

InstructionsScreen.contextType = PantryfiedContext;
