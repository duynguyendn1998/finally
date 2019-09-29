import React, { Component } from 'react';
import { View, Text,StyleSheet,Image } from 'react-native';

export default class FeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const {item:{image,store_name,km,status}}=this.props;
    return (
      <View style={styles.container}>
          <Image resizeMode={"contain"} style={styles.image} source={{uri:'http://channel.mediacdn.vn/prupload/879/2017/11/img20171110120527350.jpg'}} />
        <View style={styles.info}>
          <View style={styles.wrapper}>
            <Text style={styles.label}>{store_name}</Text>
            <Text style={{color:'gray',fontSize:14}}>Quá tuyệt</Text>
            <Text style={[styles.label,{marginVertical:'5%'}]}>{Math.round(km*1000)} m</Text>
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

