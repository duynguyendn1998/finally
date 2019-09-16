import React from 'react';
import {  TextInput,TouchableOpacity, StyleSheet, Text, View,AsyncStorage } from 'react-native';

const userInfo={userId:'123',password:'123'}

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userid:'',
            password:''
        }
    }
    onLogin = async () =>{
        if(userInfo.userId===this.state.userid && userInfo.password===this.state.password)
        {
            await AsyncStorage.setItem('isLoggedIn','1')
            this.props.navigation.navigate('Home');
        }
        else{
            alert('Vui lòng kiểm tra lại số điện thoại và mật khẩu.')
        }
    }
    changeText = (text) =>{
        this.setState({
            userid:text
        })
    }
    changePass = (text) =>{
        this.setState({
            password:text
        })
    }

    render(){
        const {password,userid}=this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Đăng nhập</Text>
                <View style={styles.inputArea}>
                    <Text style={styles.lable}>SỐ ĐIỆN THOẠI</Text>
                    <TextInput style={styles.inputText}
                    placeholder='Vui lòng nhập số điện thoại của bạn'
                    onChangeText={this.changeText}
                    value={userid} />
                </View>
                <View style={styles.inputArea}>
                    <Text  style={styles.lable}>MẬT KHẨU</Text>
                    <TextInput style={styles.inputText}
                    secureTextEntry={true}
                    placeholder='6 ký tự trở lên'
                    onChangeText={this.changePass}
                    value={password} />
                </View>
                <TouchableOpacity style={styles.buttonLogin} onPress={this.onLogin}>
                    <Text style={[styles.lable,{marginTop:'3.5%'}]}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={[styles.lable,{marginTop:'3.5%'}]}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
LoginScreen.navigationOptions = {
    header:null,
  };
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ED3E7A',
        alignItems: 'center',
    },
    title:{
        marginTop:'6%',
        fontSize:25,
        fontStyle:'normal',
        color:'#ffffff',
        fontWeight:'bold',
       // backgroundColor:'blue',
    },
    inputArea:{
        width: '86%',
        height: 80,
       // backgroundColor:'blue',
        marginTop:'6%',
        marginHorizontal:'7%'
    },
    lable:{
        fontSize:17,
        color:'#ffffff',
    },
    inputText:{
        fontSize:18,
        backgroundColor:'#ffffff',
        borderRadius:6,
        height:50,
        marginTop:5
    },
    buttonLogin:{
        width: '86%',
        height: 50,
        backgroundColor:'#5F2237',
        marginHorizontal:'7%',
        marginTop:'10%',
        alignItems:'center',
        borderRadius:6
       
    }

    
});