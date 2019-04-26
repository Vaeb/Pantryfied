import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import Dialog from 'react-native-dialog';
import { PantryfiedContext } from '../context/PantryfiedContext';

export default class PersonalDetailsScreen extends Component {
  constructor(props) {
    super(props);

    // obtain stored data
    this.state = {
      details: {
        height: '',
        weight: '',
      },
      data: ['Email Address', 'First name'],
      dialogVisible: false,
    };
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  // eslint-disable-next-line class-methods-use-this
  alertBox(item) {
    for (let i = 0; i < this.state.data.length; i++) {
      if (item.key == this.state.data[i]) {
        console.log(`Pressed: ${item.key}`);
        this.showDialog();
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderButton(item) {
    console.log('renderButton: ', item);
    return (
      <View>
        <TouchableOpacity onPress={() => this.alertBox(item)}>
          <Text style={styles.text}>{item.key}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const data = [{ key: 'Email Address' }, { key: 'First name' }];
    return (
      <View>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>Do you want to delete this account? You cannot undo this action.</Dialog.Description>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Delete" onPress={this.handleDelete} />
        </Dialog.Container>
        <Text style={styles.headerBar}> Personal details </Text>
        <FlatList data={data} renderItem={({ item }) => this.renderButton(item)} />
      </View>
    );
  }
}

PersonalDetailsScreen.contextType = PantryfiedContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 2,
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
  cell: {
    padding: 10,
    fontSize: 18,
    height: 44,
    margin: 30,
    justifyContent: 'center', // https://reactnativecode.com/justifycontenton-style-explained/
  },
  text: {
    textAlign: 'left',
    paddingLeft: 5,
    marginTop: 20,
    width: 360,
    height: 40,
    fontSize: 28,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
});
