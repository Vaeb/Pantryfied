import React, { Component } from 'react';
import { Text, View, AsyncStorage, FlatList } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class FavouritesScreen extends Component {
  constructor(props) {
    super(props);
    this.getFavourites = this.getFavourites.bind(this);
  
    // need to be able to pass argument into this function
    this.storeFavourites = async () => {
      await AsyncStorage.mergeItem('favouritesList', JSON.stringify(this.state.newFavourite), (error) => { console.log('Merge error: ', error); });
    };

    this.state = {
      favourites: {},
      storeNewFavourite: this.storeFavourites,
      newFavourite: {},
    };
  }


  async getFavourites() {
    let favList = '';
    try {
      favList = await AsyncStorage.getItem('favouritesList') || 'none';
    } catch (error) {
      console.log(error.message);
    }
    this.setState({ favourites: JSON.parse(favList) });
  }


  // will only render the favourites that were present when app was loaded
  // make function to update and rerender (may just have to update state object)
  render() {

    const dataArr = [this.state.favourites];
    return (
      <View>
        <Text> Favourites Screen </Text>
        <FlatList
          data={dataArr}
          renderItem={({item}) => <Text style={styles.item}>{item.id}</Text>}
        />
      </View>
    );
  }
}

FavouritesScreen.contextType = PantryfiedContext;
