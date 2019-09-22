import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,AsyncStorage } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
export default class UserScreen extends Component {
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
        <View style={styles.info}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                <Feather name="x" size={27} color='#fff'/>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.textName}>Nguyen Van A</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.content}>
            <View style={styles.wrapper}>
                <Text style={styles.textLable}>Lịch sử giao dịch</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("History")}>
                     <AntDesign name="right" size={25}/>
                </TouchableOpacity>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.textLable}>Hỗ trợ</Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("History")}>
                     <AntDesign name="right" size={25}/>
                </TouchableOpacity>
            </View>
          <TouchableOpacity  onPress={this.logout}>
          <Text style={[styles.textLable,{marginTop:'1.5%'}]}>Đăng xuất</Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
UserScreen.navigationOptions = {
    header: null,
  };

const styles = StyleSheet.create({
    container: {
        marginVertical:'3.5%',
        flex: 1,
        backgroundColor: '#fff',
      },
      info: {
        marginTop:'2.4%',
        flex: 0.3,
        backgroundColor: "#ED3E7A",
        alignItems: "flex-start",
        justifyContent: "space-between"
      },
      content: {
        flex: 0.7,
      },
      textLable:{
        color: "#000000",
        fontSize: 20
      },
      textName:{
        color:'#fff',
        fontSize:25
      },
      wrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'1.5%'
      }
})
