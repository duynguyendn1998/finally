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
            <View style={styles.imageWrapper}>
              <Image  style={styles.image}
                    source={require('../assets//images//Splash1.png')}/>
              <Text style={styles.textName}>Nguyen Van A</Text>
            </View>
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
          <Text style={[styles.textLable,{marginTop:'3%'}]}>Đăng xuất</Text>
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
        fontSize:25,
      },
      image:{
        height:120,
        width:120,
        borderRadius:60,
      },
      imageWrapper:{
        flex:1,
        marginTop:40,
        marginHorizontal:'1.5%',
        flexDirection: 'row',
        alignItems:'center',
      },
      wrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:'3%'
      }
})
