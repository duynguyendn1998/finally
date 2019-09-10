import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginScreen from '../screens/LoginScreen';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {item:{image,name,km,status}}=this.props;
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri:image}} />
        
          <View style={styles.info}>
            <View style={styles.wrapper}>
              <Text style={styles.label}>{name}</Text>
              <Text style={{color:'gray',fontSize:14}}>{status}</Text>
              <Text style={[styles.label,{marginVertical:'5%'}]}>{km}</Text>
            </View>
          </View>
        </View>
    );
  }
}
LoginScreen.navigationOptions = {
  title:"Login"
};

const styles= StyleSheet.create({
  container: {
    flex: 1,
    height:94,
    backgroundColor: '#fff',
    flexDirection:'row',
    marginHorizontal:'3%',
    marginVertical:'2%'
  },
  image:{
    flex:0.3,
    //backgroundColor:'red',
    height:94,
    resizeMode:"cover" 
  },
  info:{
    flex: 0.7,
    //backgroundColor:'yellow',
    justifyContent:'flex-start'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    //fontFamily:'sans-serif'
  },
  wrapper:{
    marginHorizontal:'5%',
    marginVertical:'3%'
  }
});
