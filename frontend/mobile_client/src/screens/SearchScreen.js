import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import gql from 'graphql-tag';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';


/*const getRecipeQuery = gql`
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
`;*/

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
    };
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
      .catch((error) => console.log(error));
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
        //variables: { ingredients: this.state.ingredientsArg },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        let dataArr = data.getRecipes;
        console.log(dataArr);
        dataArr.forEach((arrayItem) => {
          arrayItem.key = arrayItem.id.toString();
          arrayItem.favourite = false;
        });
        dataArr = this.checkResultsFavourites(dataArr);
        this.context.setFoundRecipeList(dataArr);
        console.log("data arr: ", dataArr);
      })
      .catch((error) => console.log(error));

    this.props.navigation.navigate('SearchResultsScreen');
  }


  // probably needs optimising
  checkResultsFavourites(dataArr) {
    this.context.favourites.forEach((arrayItem) => {
      dataArr.forEach((dataItem) => {
        if (arrayItem.key == dataItem.key) {
          dataItem.favourite = true;
        }
      });
    });
    return dataArr;
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
