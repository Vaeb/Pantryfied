import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class MainSettingsScreen extends Component {
  /*
   * This will probably just be a <FlatList> of buttons, dont worry about the navigation yet, just get it looking decent
   * and then ill give you some more pages to add in once we decide what settings there are
   */
  // constructor(prop) {
  //   super(props);

  //   this.state = {
  //     data: [],
  //     loading: false,
  //     refreshing: false,
  //   };
  // }

  render() {
    const data = [
      { key: 'Personal details' },
      { key: 'Account details' },
      { key: 'Unit system' },
      { key: 'Food preference' },
      { key: 'Logout' },
    ];
    return (
      <View style={styles.MainContainer}>
        <FlatList data={data} renderItem={({ item }) => <Text style={styles.text}>{item.key}</Text>} />
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
  text: {
    textAlign: 'center',
    width: 360,
    height: 40,
    borderColor: 'grey',
    marginTop: 20,
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
