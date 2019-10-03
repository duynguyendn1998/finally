import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {item:{image,store_name,km,category}}=this.props;
    return (
      <View style={styles.container}>
          <Image resizeMode={"contain"} style={styles.image} source={{uri:image}} />
        <View style={styles.info}>
          <View style={styles.wrapper}>
            <View style={{flex:0.8}}>
              <Text style={[styles.label,{width:240}]}>{store_name}</Text>
              <Text style={{color:'gray',fontSize:14}}>{category}</Text>
            </View>
            <Text style={[styles.label,{flex:0.2}]}>{Math.round(km*100)/100} km</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    height:94,
    backgroundColor: '#fff',
    flexDirection:'row',
    marginVertical:'2%',
    marginBottom:15
  },
  image:{
    width:100,
    height:100,
    resizeMode:"cover",
    borderRadius:5
  },
  info:{
    //flex: 0.7,
    width: 255,
    justifyContent:'flex-start',
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  wrapper:{
    flex:1,
    marginHorizontal:'5%',
    marginVertical:'3%',
  },
});

