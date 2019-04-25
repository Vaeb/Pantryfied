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
  // changeUnit() {
  //   if (item.key == 'Imperial system - Ounces') {
  //     console.log('Imperial');
  //     // change metric settings across whole app
  //   } else {
  //     console.log('Metric');
  //   }
  // }

  // renderButton(item) {
  //   console.log('renderButton: ', item);
  //   return (
  //     <View>
  //       <TouchableOpacity onPress={() => this.changeUnit(item)}>
  //         <Text style={styles.text}>{item.key}</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
  changeToMetric() {
    console.log('Selected Metric');
  }

  changeToImperial() {
    console.log('Selected Imperial');
  }

  render() {
    // const data = [{ key: 'Imperial system - Ounces' }, { key: 'Metric system - Grams' }];
    return (
    // <TouchableOpacity>
    //   <View>
    //     <FlatList data={data} renderItem={({ item }) => this.renderButton(item)} />
    //   </View>
    // </TouchableOpacity>

      <View>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text onPress={this.changeToImperial} style={styles.buttonText}>

            Imperial system - Ounces
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text onPress={this.changeToMetric} style={styles.buttonText}>

            Metric system - Grams
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

UnitsScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: '#rgba(40,186,163, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    marginTop: 50,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    borderColor: '#28BAA5',
  },
});
