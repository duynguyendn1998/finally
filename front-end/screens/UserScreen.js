import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,AsyncStorage,Image } from 'react-native';
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
            <View style={styles.Wrapper}>
              <Text style={styles.textName}>Đào Bảo Duy</Text>
            </View>
        </View>
        <View style={styles.content}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("History")}>
            <View style={styles.wrapper}>
              <Text style={styles.textLable}>Lịch sử giao dịch</Text>
              <AntDesign name="right" size={25}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.wrapper}>
                <Text style={styles.textLable}>Hỗ trợ</Text>
                <AntDesign name="right" size={25}/>
              </View>
            </TouchableOpacity>
          <TouchableOpacity  onPress={this.logout}>
          <Text style={[styles.textLable,{marginTop:'4.5%'}]}>Đăng xuất</Text>
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
        justifyContent:'space-between'
      },
      content: {
        flex: 0.7,
        marginHorizontal:'1.5%',
      },
      textLable:{
        color: "#000000",
        fontSize: 20
      },
      textName:{
        //flex:0.96,
        marginLeft: 8,
        color:'#fff',
        fontSize:27,
        fontWeight:'300',
        marginBottom:'3%'
      },
      wrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'3%'
      }
})
