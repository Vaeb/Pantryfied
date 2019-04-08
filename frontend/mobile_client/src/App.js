/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import { PantryfiedContext } from './context/PantryfiedContext';
import AppNavigation from './navigation/AppNavigation';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.storeFavourite = async (newFavourite) => {
      await AsyncStorage.mergeItem('favouritesList', JSON.stringify(newFavourite), (error) => { console.log('Merge error: ', error); });
    };

    this.setRecipeToRender = (recipe) => {
      this.setState({ renderRecipe: recipe });
    };

    this.setRecipeList = (recipeList) => {
      this.setState({ foundRecipes: recipeList });
    };

    this.state = {
      userData: {
        username: undefined,
        password: undefined,
        loginToken: undefined,
      },
      setFoundRecipeList: this.setRecipeList,
      foundRecipes: [],
      storeNewFavourite: this.storeFavourite,
      renderRecipe: {},
      setRenderRecipe: this.setRecipeToRender,
    };
  }

  render() {
    return (
      <PantryfiedContext.Provider
        value={{
          user: this.state.userData,
          storeNewFavourite: this.state.storeNewFavourite,
          setRenderRecipe: this.state.setRenderRecipe,
          renderRecipe: this.state.renderRecipe,
        }}
      >
        <AppNavigation screenProps={{ ...this.props }} />
      </PantryfiedContext.Provider>
    );
  }
}

App.contextType = PantryfiedContext;
