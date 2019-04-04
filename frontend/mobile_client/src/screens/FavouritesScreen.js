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
    this.state = {
      favourites: [
        { key: 'key1', id: "Recipe1", favourite: true },
        { key: 'key2', id: "Recipe2", favourite: false },
      ],
      refresh: true,
    };

    console.log(this.state.favourites);
  }

  componentDidMount() {
    console.log("Fav mounted");
  }

  componentWillUnmount() {
    console.log("Fav unmounted");
  }

  updateFavouriteArray(item) {
    //console.log(this.state.favourites);

    this.state.favourites.forEach((arrayItem) => {
      if (arrayItem.key == item.key) {
        if (arrayItem.favourite) {
          arrayItem.favourite = false;
        } else {
          arrayItem.favourite = true;
        }
      }
    });

    //console.log(this.state.favourites);
  }


  renderFavButton(item) {

    console.log("rendering: ", JSON.stringify(item));
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
    } catch (error) {
      console.log(error.message);
    }
    this.setState({ favourites: [JSON.parse(favList)] });
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
