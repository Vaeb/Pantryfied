import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.ingredientPressed = this.ingredientPressed.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.searchButtonPressed = this.searchButtonPressed.bind(this);
    this.shaveList = this.shaveList.bind(this);
    this.state = {
      ingredients: [
        { key: "key1", name: "ingredient1", selected: false },
        { key: "key2", name: "ingredient2", selected: false },
        { key: "key3", name: "ingredient3", selected: false },
      ],
      ingredientsToSearch: [],
    };
  }

  ingredientPressed(item) {
    
    this.state.ingredients.forEach((arrayItem) => {
      if (arrayItem.key == item.key) {
        if (arrayItem.selected) {
          arrayItem.selected = false;
        } else {
          arrayItem.selected = true;
        }
        this.setState({ refresh: !this.state.refresh });
      }
    });
  }

  renderSelected(item) {
    if (item.selected) {
      return <Image source={require('../assets/selectedItem.png')} style={{ flex: 1 }} />;
    }
    return <Image source={require('../assets/unselectedItem.png')} style={{ flex: 1 }} />;
  }

  renderItem(item) {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => this.ingredientPressed(item)} style={{ flex: 4 }}>
          <Text style={styles.item}>{item.key}</Text>
        </TouchableOpacity>
        {this.renderSelected(item)}
      </View>
    );
  }

  searchButtonPressed() {
    this.shaveList();
    console.log("ingredients Arr: " + JSON.stringify(this.state.ingredientsToSearch));
    // get the recipes from the backend using this.state.ingredientsToSearch
    // this.context.setFoundRecipeList(returned Recipe list array)
    this.props.navigation.navigate('SearchResultsScreen');
  }

  shaveList() {
    this.state.ingredients.forEach((arrayItem) => {
      if (arrayItem.selected) {
        this.state.ingredientsToSearch.push(arrayItem);
      }
    });
  }

  render() {
    return (
      <View>
        <Text style={{ flex: 2 }}> Search Screen </Text>
        <FlatList
            data={this.state.ingredients}
            extraData={this.state.refresh}
            renderItem={({item}) => this.renderItem(item)}
        />
        <Button inheritStyle={styles.searchButtonStyle} inheritTextStyle={styles.searchButtonText} onPress={this.searchButtonPressed}>
          Search with selected ingredients
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
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  searchButtonStyle: {
    padding: 10,
    flex: 1,
  },
  searchButtonText: {
    fontSize: 18,
  },
});

SearchScreen.contextType = PantryfiedContext;
