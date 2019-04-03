import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';
import { Button } from '../components/common/Button';

// eslint-disable-next-line react/prefer-stateless-function
export default class SearchScreen extends Component {
  constructor(props) {
    super(props);
    this.navigateRecipePressed = this.navigateRecipePressed.bind(this);
  }

  navigateRecipePressed() {
    this.props.navigation.navigate("RecipeScreen");
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
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        <Button onPress={this.navigateRecipePressed} inheritStyle={styles.navButton} inheritTextStyle={styles.navButtonText}>
          Navigate to Recipe Screen
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
});

SearchScreen.contextType = PantryfiedContext;
