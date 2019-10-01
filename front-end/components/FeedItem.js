import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';
import { Rating } from 'react-native-elements';

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
          <View style={styles.wrapper}>
              <View style={styles.info}>
                <Text style={[styles.label,{marginTop:5}]}>{store_name}</Text>
                <Text style={{color:'gray',fontSize:14}}>{category}</Text>
                <Text style={[styles.label,{marginTop:7}]}>{Math.round(km*100)/100} km</Text>
              </View>
              <View style={styles.styleRating}>
                <Rating type='star' imageSize={20} startingValue={1 + (Math.random()*4)} />  
                <Text style={styles.core}>{Math.round(1 + Math.random()*99)} đánh giá</Text>
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
  wrapper:{
    width:275,
    height:'100%',
    marginLeft:10,
    justifyContent:'flex-start',
    marginBottom:5,
  },
  info:{
    flex:0.8,
  },
  label: {
    fontSize: 16,
    fontWeight:'400',
    color: 'black',
  },
  styleRating:{
    flex:0.2,
    justifyContent:'flex-start',
    alignItems:'flex-end',
    flexDirection:'row',
  },
  core:{
    color:'gray',
    fontSize:14,
    marginLeft:10,
  }
});

