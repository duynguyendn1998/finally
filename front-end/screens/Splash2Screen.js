import React, { Component } from 'react';
import { View, Text,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native';

export default class Splash2Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onNext = () =>{
    this.props.navigation.navigate("Splash3");
  }
  onSkip = () =>{
    this.props.navigation.navigate("Login");
  }

  render() {
    return (
      <ImageBackground style={styles.container} 
       source={require('../assets/images/Splash2.png')}
       resizeMode='stretch'>
        <TouchableOpacity style={styles.buttonLable} onPress={this.onSkip}>
          <Text style={styles.text} > Bỏ qua </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress={this.onNext}>
          <Text style={[styles.text,{marginTop:10}]}> Tiếp tục </Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

Splash2Screen.navigationOptions = {
  header:null,
};

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'red',
  },
  buttonLable:{
    flex:0.92,
    marginTop:'10%',
    marginLeft:'80%',
  },
  buttonStyle:{
    flex:0.08,
    marginBottom:'5%',
    backgroundColor:'#ED3E7A',
    borderRadius:6,
    marginHorizontal:'7%',
   // justifyContent:'space-around',
    alignItems: 'center',
  },
  text:{
    fontSize: 18,
    fontWeight:'bold',
    color:'#ffffff',
  }
})
