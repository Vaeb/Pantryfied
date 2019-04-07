import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';
import { FavButton } from '../components/common/FavButton';

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.favouriteButtonPressed = this.favouriteButtonPressed.bind(this);
    this.recipePressed = this.recipePressed.bind(this);
    this.state = {
      recipes: [
        
      ],
    }
  }

  favouriteButtonPressed(item) {
    // invert item favourite setting
    // add or remove favourite as required
    console.log("item: ", item);
  }

  addFavourite(newFavourite) {
    this.context.storeNewFavourite(newFavourite);
  }

  recipePressed(recipe) {
    this.context.setRenderRecipe(recipe);
    this.props.navigation.navigate('RecipeScreen');
  }

  renderItem(item) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.recipePressed({ recipe: item })} style={{ flex: 4 }}>
          <Text style={styles.item}>{item.key}</Text>
        </TouchableOpacity>
        <FavButton onPress={() => this.favouriteButtonPressed(item)} definedFlex={1} />
      </View>
    );
  }
  
  render() {
    return (
      <View>
        <Text style={{ flex: 2 }}> Search Screen </Text>
        <FlatList
            data={[
              {key: "Recipe1"},
              {key: "Recipe2"},
            ]}
            renderItem={({item}) => this.renderItem(item)}
        />
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

SearchScreen.contextType = PantryfiedContext;
