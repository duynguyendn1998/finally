import React from 'react';
import { TouchableOpacity, TextInput,Image, StyleSheet, Text, View } from 'react-native';

export default class LoginScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userid:''
        }
    }
    onLogin = () =>{
        this.props.navigation.navigate('Home',{userid:this.state.userid});
    }
    changeText = (text) =>{
        this.setState({
            userid:text
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <Image style={styles.image}></Image>
                <View style={styles.inputLogin}>
                    <TextInput 
                        onChangeText={this.changeText}
                        style={styles.textInput}
                        placeholder="Số điện thoại hoặc email"
                    />
                    <TextInput 
                        style={styles.textInput}
                        placeholder="Mật khẩu"
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity style={styles.buttonLogin} onPress={this.onLogin}>
                    <Text style={{fontWeight:"bold",}}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    image:{
        flex:0.3,
        alignSelf: 'stretch',
        backgroundColor:"red"
    },

    inputLogin:{
        paddingTop:50,
        flex:0.2,
    },
    textInput:{
        height: 40,
        width: 400,
        fontSize: 24,
        borderWidth: 1,
        borderColor: 'lightblue'
    },
    buttonLogin:{
        alignItems:"center",
        justifyContent:"center",
        flex:0.05,
        width:200,
        backgroundColor:"green",
    }
});