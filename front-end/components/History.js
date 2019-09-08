import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hề lố ma đờ phắc cớ</Text>
        <Text>Drawer Item 2</Text>
        </View>
    )
  }
}
