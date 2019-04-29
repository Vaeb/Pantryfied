import React, { Component } from 'react';
import {
  Text, View, StyleSheet, FlatList, TouchableOpacity, Image, CheckBox,
} from 'react-native';
import gql from 'graphql-tag';
// import { SearchBar } from 'react-native-elements';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';

/* const getRecipeQuery = gql`
    query($ingredients: [Int]!) {
        getRecipes(ingredients: $ingredients) {
            id
            name
            description
            imgUrl
            ingredients {
              id
              name
            }
        }
    }
`; */

const getRecipeQuery = gql`
  query {
    getRecipes {
      id
      name
    }
  }
`;

const getIngredientsQuery = gql`
  query {
    getIngredients {
      id
      name
    }
  }
`;

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.ingredientPressed = this.ingredientPressed.bind(this);
    this.renderSelected = this.renderSelected.bind(this);
    this.searchButtonPressed = this.searchButtonPressed.bind(this);
    this.shaveList = this.shaveList.bind(this);
    this.fetchIngredientList = this.fetchIngredientList.bind(this);
    this.checkResultsFavourites = this.checkResultsFavourites.bind(this);
    this.state = {
      ingredients: [],
      ingredientsArg: [],
      ingredientsToSearch: [],
      isChecked: false,
      // search: '', // Can remove this if you dont need, following a tutorial to add search bar in
    };
    // updateSearch = (search) => {
    //   this.setState({ search });
    // };
  }

  componentDidMount() {
    this.fetchIngredientList();
  }

  async fetchIngredientList() {
    await this.context.apolloClient
      .query({
        query: getIngredientsQuery,
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        const dataArr = data.getIngredients;
        dataArr.forEach((arrayItem) => {
          arrayItem.selected = false;
          arrayItem.key = arrayItem.id.toString();
          this.state.ingredients.push(arrayItem);
        });
      })
      .catch(error => console.log(error));
    this.setState({ refresh: !this.state.refresh });
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
          <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
        {this.renderSelected(item)}
      </View>
    );
  }

  async searchButtonPressed() {
    this.shaveList();
    // get the recipes from the backend using this.state.ingredientsToSearch
    await this.context.apolloClient
      .query({
        query: getRecipeQuery,
        // variables: { ingredients: this.state.ingredientsArg },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        let dataArr = data.getRecipes;
        console.log('dataArr here', dataArr);
        dataArr.forEach((arrayItem) => {
          arrayItem.key = arrayItem.id.toString();
          arrayItem.favourite = false;
          // this code wont work for now so leave it commented out
          // arrayItem.ingredients.forEach((ingredientItem) => {
          //   ingredientItem.key = ingredientItem.id.toString();
          // });
        });
        //dataArr = this.removeAllergens(dataArr);
        dataArr = this.checkResultsFavourites(dataArr);
        this.context.setFoundRecipeList(dataArr);
        console.log('data arr: ', dataArr);
      })
      .catch(error => console.log(error));

    this.props.navigation.navigate('SearchResultsScreen');
  }

  // probably needs optimising
  checkResultsFavourites(dataArr) {
    this.context.favourites.forEach((arrayItem) => {
      dataArr.forEach((dataItem) => {
        if (arrayItem.key == dataItem.key) {
          if (arrayItem.favourite) {
            dataItem.favourite = true;
          }
        }
      });
    });
    return dataArr;
  }

  removeAllergens(dataArr) {
    let newArr = [];
    // loop through all allergens
    // loop through dataArr
    // loop through ingredients in dataArr
    // if ingredients contains an allergen then dont add to array
    // otherwise push item onto new Arr
    return newArr;
  }

  shaveList() {
    this.state.ingredients.forEach((arrayItem) => {
      if (arrayItem.selected) {
        this.state.ingredientsArg.push(arrayItem.id);
        this.state.ingredientsToSearch.push(arrayItem);
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <SearchBar placeholder="Type Here..." onChangeText={this.updateSearch} value={search} /> */}
        <Text style={styles.headerBar}> Search Screen </Text>
        <View style={{ flex: 16 }}>
          <FlatList data={this.state.ingredients} extraData={this.state.refresh} renderItem={({ item }) => this.renderItem(item)} />
        </View>
        <Button
          inheritStyle={styles.searchButtonStyle}
          inheritTextStyle={styles.searchButtonText}
          onPress={this.searchButtonPressed}
          definedFlex={1}
        >

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
    flex: 4,
    padding: 10,
    fontSize: 26,
  },
  searchButtonStyle: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#28BAA5',
  },
  searchButtonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  headerBar: {
    textAlign: 'center',
    width: '100%',
    height: 60,
    paddingTop: 10,
    fontSize: 28,
    borderBottomWidth: 1,
    color: '#fff',
    borderBottomColor: 'grey',
    backgroundColor: '#28BAA5',
  },
});

SearchScreen.contextType = PantryfiedContext;
