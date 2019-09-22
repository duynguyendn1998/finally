import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  logout= async()=>{
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
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
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("History")}>
            <Text style={styles.textLable}>Lịch sử giao dịch</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.textLable}>Hỗ trợ</Text>
          </TouchableOpacity>
          <TouchableOpacity  onPress={this.logout}>
          <Text style={styles.textLable}>Đăng xuất</Text>
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
  },
  textLable:{
    color: "#000000",
    fontSize: 25
  }
})