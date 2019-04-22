import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class AccountDetailsScreen extends Component {
  constructor(props) {
    super(props);

    // obtain stored data
    this.state = {
      details: {},
    };
  }

  render() {
    return null;
  }
}

AccountDetailsScreen.contextType = PantryfiedContext;

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
