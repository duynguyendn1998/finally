import React from 'react';
import { TextInput, TouchableOpacity, StyleSheet, Text, View, AsyncStorage } from 'react-native';


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userid: '',
            password: ''
        }
    }
    onLogin = async () => {
        if (this.state.userid && this.state.password) {
            await AsyncStorage.setItem('isLoggedIn', '1')
            await AsyncStorage.setItem('user_id', this.state.userid)
            this.props.navigation.navigate('Home');
        }
        else {
            alert('Vui lòng kiểm tra lại số điện thoại và mật khẩu.');
            this.setState({ password: '' })
        }
    }
    changeText = (text) => {
        this.setState({
            userid: text
        })
    }
    changePass = (text) => {
        this.setState({
            password: text
        })
    }

    render() {
        const { password, userid } = this.state;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Đăng nhập</Text>
                <View style={[styles.inputArea,{marginTop: '5%'}]}>
                    <Text style={styles.lable}>SỐ ĐIỆN THOẠI</Text>
                    <TextInput style={styles.inputText}
                        placeholder=' Nhập số điện thoại của bạn'
                        onChangeText={this.changeText}
                        value={userid} />
                </View>
                <View style={[styles.inputArea,{marginBottom:'10%'}]}>
                    <Text style={styles.lable}>MẬT KHẨU</Text>
                    <TextInput style={styles.inputText}
                        secureTextEntry={true}
                        placeholder=' 6 ký tự trở lên'
                        onChangeText={this.changePass}
                        value={password} />
                </View>
                <TouchableOpacity style={{width: '86%'}} onPress={this.onLogin}>
                    <View style={styles.buttonLogin}>
                        <Text style={styles.lable}>ĐĂNG NHẬP</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.lable, { marginTop: '3.5%' }]}>Quên mật khẩu?</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
LoginScreen.navigationOptions = {
    header: null,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ED3E7A',
        alignItems: 'center',
    },
    title: {
        marginTop: '13%',
        fontSize: 25,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    inputArea: {
        width: '86%',
        height: 80,
        marginHorizontal: '7%'
    },
    lable: {
        fontSize: 17,
        color: '#ffffff',
    },
    inputText: {
        fontSize: 18,
        backgroundColor: '#ffffff',
        borderRadius: 6,
        height: 50,
        marginTop: 5
    },
    buttonLogin: {
        height: 50,
        backgroundColor: '#5F2237',
        alignItems: 'center',
        borderRadius: 6,
        justifyContent:'center'
    }


});