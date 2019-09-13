import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.infor}>
          <TouchableOpacity onPress={() => this.props.navigation.pop()}>
            <Text style={{ fontSize: 25 }}>X</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Text style={{ color: "#ffffff", fontSize: 30 }}>Đào Bảo Duy                            ></Text>
          </TouchableOpacity>
        </View>
        <View style={styles.history}>
          <TouchableOpacity>
            <Text style={{ color: "#000000", fontSize: 30 }}>Lịch sử giao dịch                     ></Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "#000000", fontSize: 30 }}>Hỗ trợ                                          ></Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

History.navigationOptions = ({ navigation }) => {
  return {
    header: null,
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:50
  },
  infor: {
    flex: 0.2,
    backgroundColor: "#ED3E7A",
    alignItems: "flex-start",
    justifyContent: "space-between"
  },
  history: {
    flex: 0.8
  }
})