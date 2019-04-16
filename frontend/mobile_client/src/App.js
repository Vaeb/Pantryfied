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
import ApolloClient from 'apollo-boost';
import { PantryfiedContext } from './context/PantryfiedContext';
import AppNavigation from './navigation/AppNavigation';

const client = new ApolloClient({
  uri: 'http://vaeb.io:8080/graphql',
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.checkIfInList = this.checkIfInList.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
    this.removeItemFromArray = this.removeItemFromArray.bind(this);
    this.getFavourites = this.getFavourites.bind(this);

    this.storeFavourite = async (newFavourite) => {
      await AsyncStorage.mergeItem('favouritesList', JSON.stringify(newFavourite), (error) => { console.log('Merge error: ', error); });
    };

    this.setRecipeToRender = (recipe) => {
      this.setState({ renderRecipe: recipe.recipe });
    };

    this.setRecipeList = (recipeList) => {
      this.setState({ foundRecipes: recipeList });
    };
    
    this.updateFavouriteArray = (item) => {
      // also update foundRecipes with the check
      console.log("item: ", item);
      let newFav = [];
      if (!this.checkIfInList(item)) {
        console.log("item not in list");
        item.favourite = true;
        this.state.favourites.push(item);
      } else {
        console.log("item already in list");
        this.state.favourites.forEach((arrayItem) => {
          if (arrayItem.key == item.key) {
            if (arrayItem.favourite) {
              arrayItem.favourite = false;
              this.removeFavourite(item);
            } else {
              arrayItem.favourite = true;
              this.addFavourite(item);
            }
          }
          newFav.push(arrayItem);
        });
        this.setState({ favourites: newFav });
      }
    };

    this.state = {
      userData: {
        username: undefined,
        password: undefined,
        loginToken: undefined,
      },
      setFoundRecipeList: this.setRecipeList,
      // foundRecipes: [],
      foundRecipes: [
        {
          key: 101,
          title: "Potato and Fennel Soup Hodge",
          desc: "The Sicilian-style tomato sauce has tons of Mediterranean flavor, thanks to the orange peel, olives, and oregano.",
          imgUrl: "../Images/testRecipeImage.jpg",
          directions: "Step1: dsfsdljfdskljf\nStep2:jldsfhdslfds\nStep3:lkdsfhdujksdsfds",
          fat: 32,
          protein: 20,
          sodium: 452,
          calories: 546,
          rating: 3,
          ingredients: [
            {
              id: 201,
              name: "Ingredient 1",
            },
            {
              id: 202,
              name: "Ingredient 2",
            },
          ],
        },
      ],
      storeNewFavourite: this.storeFavourite,
      renderRecipe: {},
      setRenderRecipe: this.setRecipeToRender,
      updateFavouriteArray: this.updateFavouriteArray,
      apolloClient: client,
      favourites: [],
      /*
      // for testing
      favourites: [
        { key: "key1", name: "Recipe1", favourite: true },
        { key: "key2", name: "Recipe2", favourite: true },
        { key: "key3", name: "Recipe3", favourite: true },
        { key: "key4", name: "Recipe4", favourite: true },
      ],
      */
    };
  }

  componentDidMount() {
    this.getFavourites();
  }

  async getFavourites() {
    let favList = '';
    try {
      favList = await AsyncStorage.getItem('favouritesList') || 'none';
      console.log("init favList: ", favList);
    } catch (error) {
      console.log(error.message);
    }
    this.setState({ favourites: JSON.parse(favList) });
  }

  async addFavourite(item) {
    console.log("Item:", item);
    if (this.checkIfInList(item)) {
      console.log("item already in list so dont push");
    } else {
      console.log("item not in list");
      this.state.favourites.push(item);
      try {
        await AsyncStorage.setItem('favouritesList', JSON.stringify(this.state.favourites));
        console.log("favList add: ", JSON.stringify(this.state.favourites));
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  checkIfInList(item) {
    console.log("checkItem");
    let itemFound = false;
    this.state.favourites.forEach((arrayItem) => {
      if (arrayItem.key == item.key) {
        console.log("Item found");
        itemFound = true;
      }
    });
    return itemFound;
  }

  async removeFavourite(item) {
    try {
      const favListArr = this.removeItemFromArray(item);
      await AsyncStorage.setItem('favouritesList', JSON.stringify(favListArr));
      console.log("favList remove: ", favListArr);
    } catch (error) {
      console.log(error.message);
    }
  }

  removeItemFromArray(item) {
    let newFavArr = [];
    this.state.favourites.forEach((arrayItem) => {
      if (arrayItem.key != item.key) {
        newFavArr.push(arrayItem);
      }
    });
    return newFavArr;
  }

  render() {
    return (
      <PantryfiedContext.Provider
        value={{
          user: this.state.userData,
          storeNewFavourite: this.state.storeNewFavourite,
          setRenderRecipe: this.state.setRenderRecipe,
          renderRecipe: this.state.renderRecipe,
          foundRecipes: this.state.foundRecipes,
          apolloClient: this.state.apolloClient,
          setFoundRecipeList: this.state.setFoundRecipeList,
          favourites: this.state.favourites,
          updateFavouriteArray: this.state.updateFavouriteArray,
        }}
      >
        <AppNavigation screenProps={{ ...this.props }} />
      </PantryfiedContext.Provider>
    );
  }
}

App.contextType = PantryfiedContext;
