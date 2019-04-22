import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class MainSettingsScreen extends Component {
  /*
   * This will probably just be a <FlatList> of buttons, dont worry about the navigation yet, just get it looking decent
   * and then ill give you some more pages to add in once we decide what settings there are
   */
  constructor(props) {
    super(props);
    this.navigateToScreen = this.navigateToScreen.bind(this); 
    this.renderButton = this.renderButton.bind(this);
    this.state = {
      data = [
        { key: 'Personal details', nav: "PersonalDetailsScreen" },
        { key: 'Account details', nav: "AccountDetailsScreen" },
        { key: 'Unit system', nav: "UnitsScreen" },
        { key: 'Food preference', nav: "PreferencesScreen" },
        { key: 'Logout', nav: "LogoutScreen" },
      ],
      loading: false,
      refreshing: false,
    };
  }

  navigateToScreen(item) {
    this.props.navigation.navigate(item.nav);
  }
  
  renderButton(item) {
    return(
      <TouchableOpacity onPress={() => this.navigateToScreen(item)}>
        <Text>{item.key}</Text> 
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={styles.MainContainer}>
          <FlatList data={this.state.data} renderItem={({ item }) => {this.renderButton(item)} />
      </View>
    );
  }
}

MainSettingsScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  cell: {
    padding: 10,
    fontSize: 18,
    height: 44,
    margin: 30,
    justifyContent: 'center', // https://reactnativecode.com/justifycontenton-style-explained/
  },
});
