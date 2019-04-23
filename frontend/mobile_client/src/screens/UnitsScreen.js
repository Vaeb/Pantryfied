import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class UnitsScreen extends Component {
  constructor(props) {
    super(props);

    // obtain stored data
    this.state = {
      details: {},
    };
  }

  // eslint-disable-next-line class-methods-use-this
  changeUnit(item) {
    if (item == 'Imperial system - Ounces') {
      console.log('Imperial');
      // change metric settings across whole app
    } else {
      console.log('Metric');
    }
  }

  renderButton(item) {
    console.log('renderButton: ', item);
    return (
      <View>
        <TouchableOpacity onPress={() => this.changeUnit(item)}>
          <Text style={styles.text}>{item.key}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const data = [{ key: 'Imperial system - Ounces' }, { key: 'Metric system - Grams' }];
    return (
      <TouchableOpacity>
        <View>
          <FlatList data={data} renderItem={({ item }) => this.renderButton(item)} />
        </View>
      </TouchableOpacity>
    );
  }
}

UnitsScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
  },
  text: {
    textAlign: 'left',
    width: 360,
    height: 40,
    borderColor: 'grey',
    marginTop: 20,
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
