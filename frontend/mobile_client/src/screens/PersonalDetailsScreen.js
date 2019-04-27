import React, { Component } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity,
} from 'react-native';
import Dialog from 'react-native-dialog';
import { PantryfiedContext } from '../context/PantryfiedContext';

export default class PersonalDetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.showDialog = this.showDialog.bind(this);
    this.handleCancel = this.handleCancel.bind(this);

    // obtain stored data
    this.state = {
      details: {
        height: '',
        weight: '',
      },
      data: ['Email Address', 'First name'],
      dialogVisibleArray: [false, false],
      dialogVisible: false,
      index: 0,
    };
  }

  // Plan:
  /*
      User selects a button, goes to render button, which passes the item to AlertBox, which will find out which button was pressed,
      with this value we will make the dialogBox correlated to that appear and the text on the diaglog will be associated with that. i.e:
      email button is pressed, this will show the dialog button which will also change any text for the dialog.

  */

  showDialog(i) {
    this.setState({ dialogVisible: true });
    this.setState({ [this.state.dialogVisibleArray[i]]: true });
    // this.setState({ [dialogVisibleArray[i]]: true }); // Does not work either

    console.log(`state on 1: ${this.state.dialogVisibleArray}`); // Returns false for some reason
    console.log(`state on 2: ${this.state.dialogVisible}`); // Returns true
  }

  handleCancel(i) {
    // this.setState({ dialogVisible: false });
    this.setState({ [this.state.dialogVisibleArray[i]]: false });
    console.log(this.state.dialogVisibleArray[i]);
  }

  // eslint-disable-next-line class-methods-use-this
  alertBox(item) {
    for (let i = 0; i < this.state.data.length; i++) {
      if (item.key == this.state.data[i]) {
        this.showDialog(i);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  renderButton(item) {
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
    let text = this.state.dialogVisibleArray[0] == true ? 'Enter email etc ' : 'error'; // If email is pressed, text will be this

    if (this.state.dialogVisibleArray[0] == true) {
      text = 'Enter email etc';
    } else if (this.state.dialogVisibleArray[1] == true) {
      text = 'Enter Name etc';
    } else {
      text = 'error';
    }

    for (let i = 0; i < this.state.dialogVisibleArray.length; i++) {
      if (this.state.dialogVisibleArray[i] == true) {
        console.log(`-------: ${this.state.dialogVisibleArray}`);
        this.index = i;
      }
    }
    return (
      <View>
        <Dialog.Container visible={this.state.dialogVisibleArray[this.index]}>
          <Dialog.Title>Account delete</Dialog.Title>
          <Dialog.Description>Do you want to delete this account? You cannot undo this action.</Dialog.Description>
          <Dialog.Input>{text}</Dialog.Input>
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
