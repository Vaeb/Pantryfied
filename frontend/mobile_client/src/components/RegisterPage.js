import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from './common/Button';

export default class RegisterPage extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View>
        <Text>
          Register page
        </Text>
        <Button onPress={this.goBack}>
          Back to login screen
        </Button>
      </View>
    );
  }
}
