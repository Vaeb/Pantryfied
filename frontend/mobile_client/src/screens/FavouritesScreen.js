import React, { Component } from 'react';
import {
  Text,
  View,
  AsyncStorage,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { FavButton } from '../components/common/FavButton';
import { FavButtonFill } from '../components/common/FavButtonFill';


// eslint-disable-next-line react/prefer-stateless-function
export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.getFavourites = this.getFavourites.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.favouriteButtonPressed = this.favouriteButtonPressed.bind(this);
    this.updateFavouriteArray = this.updateFavouriteArray.bind(this);
    this.removeFavourite = this.removeFavourite.bind(this);
    this.addFavourite = this.addFavourite.bind(this);
    this.resetAsyncStorage = this.resetAsyncStorage.bind(this);
    this.removeItemFromArray = this.removeItemFromArray.bind(this);
    this.state = {
      /*
      for testing
      favourites: [
        { key: "key1", name: "Recipe1", favourite: true },
        { key: "key2", name: "Recipe2", favourite: true },
        { key: "key3", name: "Recipe3", favourite: true },
        { key: "key4", name: "Recipe4", favourite: true },
      ],
      */
      favourites: [],
      refresh: true,
    };
  }

  // may be unused code in this component, not checked yet

  componentDidMount() {
    console.log("Fav mounted");
    // this.resetAsyncStorage();

    this.getFavourites();
    this.forceUpdate();
  }

  componentWillUnmount() {
    console.log("Fav unmounted");
  }

  // testing
  async resetAsyncStorage() {
    await AsyncStorage.setItem('favouritesList', JSON.stringify(this.state.favourites));
  }

  updateFavouriteArray(item) {
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
    });
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

  renderFavButton(item) {
    if (item.favourite) {
      return (
        <FavButtonFill onPress={() => this.favouriteButtonPressed(item)} definedFlex={1} />
      );
    }
    return (
      <FavButton onPress={() => this.favouriteButtonPressed(item)} definedFlex={1} />
    );
  }

  favouriteButtonPressed(item) {
    // invert item favourite setting
    // add or remove favourite as required
    this.updateFavouriteArray(item);
    this.setState({ refresh: !this.state.refresh });
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
        {this.renderFavButton(item)}
      </View>
    );
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


  // will only render the favourites that were present when app was loaded
  // make function to update and rerender (may just have to update state object)
  render() {
    console.log("render");
    return (
      <View>
        <Text> Favourites Screen </Text>
        <FlatList
          data={this.state.favourites}
          extraData={this.state.refresh}
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
    flex: 4,
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

FavouritesScreen.contextType = PantryfiedContext;
