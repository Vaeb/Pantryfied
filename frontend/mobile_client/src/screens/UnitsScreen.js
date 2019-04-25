import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import { PantryfiedContext } from '../context/PantryfiedContext';

// eslint-disable-next-line react/prefer-stateless-function
export default class UnitsScreen extends Component {
  constructor(props) {
    super(props);
    //this.checkInitialState = this.checkInitialState.bind(this);
    this.buttonPressed = this.buttonPressed.bind(this);
    // obtain stored data
    this.state = {
      details: {},
      checked: false,
      colorMetric: 'green',
      colorImperial: '#rgba(40,186,163, 1)',
    };
  }
  

  componentDidMount() {
    if (!this.state.checked) {
      this.checkInitialState();
    }
  }

  checkInitialState() {
    if (this.context.units == 'imperial') {
      this.setState({ checked: true });
      this.setState({ colorMetric: '#rgba(40,186,163, 1)' });
      this.setState({ colorImperial: 'green' });
    }
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

  buttonPressed(unit) {
    console.log("unit: ", unit);
    this.context.setUnits({ unit: unit });
    if (unit == "imperial") {
      console.log("Set imperial colors");
      this.setState({ colorImperial: 'green' });
      this.setState({ colorMetric: '#rgba(40,186,163, 1)' });
    } else {
      console.log("Set metric colors");
      this.setState({ colorImperial: '#rgba(40,186,163, 1)' });
      this.setState({ colorMetric: 'green' });
    }
  }
 
  render() {
    return (
      <View>
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: this.state.colorImperial }]} onPress={() => this.buttonPressed('imperial')}>
          <Text style={styles.buttonText}>
            Imperial system - Ounces!
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: this.state.colorMetric }]} onPress={() => this.buttonPressed('metric')}>
          <Text style={styles.buttonText}>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    top: 100,
    marginTop: 90,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#fff',
    borderColor: '#28BAA5',
  },
});
