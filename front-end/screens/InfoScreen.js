import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet,View, Text ,ScrollView} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeedItem from '../components/FeedItem';
export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:{},
      content: false
    };
  }
  async componentWillMount(){
    location= await fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input='+this.props.navigation.getParam('item').address+'&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyAXk_ALvN0lYNWsbjhscoUQR24Cu93CQTU');
    location = await location.json();
    location = location.candidates[0].geometry.location;
    this.setState({
      location
    });
  }
  _seeAdd=()=>{
    return(
      <View>
        <Text>hello moi nguoi</Text>
      </View>
    )
  };
  componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }))
  }

  render() {
    region={
      latitude: this.state.location.lat,
      longitude: this.state.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }
    coordinate = {
      latitude: this.state.location.lat,
      longitude: this.state.location.lng,
    }  
    return (
      <View style={styles.container}>
        <View style={styles.article}>
          <FeedItem  item={this.props.navigation.getParam('item')} />
        </View>
        <TouchableOpacity style={styles.hint} onPress={this.componentHideAndShow}>
          <Text style={styles.lable}>Xem thêm</Text>
        </TouchableOpacity>
          { this.state.content ? <this._seeAdd/> : null}
          <MapView style={{flex:0.7, marginHorizontal:'5%'}} region={region}>
            <Marker 
              coordinate={coordinate}
            />
         </MapView>
      </View>
    );
  }
}
InfoScreen.navigationOptions = {
  title: 'Info',
  //header: null,
};
const styles= StyleSheet.create({
  container: {
    marginTop:'3.5%',
    flex: 1,
    backgroundColor: '#fff',
  },
  hint:{
    flex:0.04,
    marginLeft:'73%',
    marginHorizontal: '5%',
  },
  lable:{
    color:'#ED3E7A',
    textDecorationLine:'underline'
  },
  article:{
    marginHorizontal:'3%',
    flex:0.2,
  //  backgroundColor:'red'
  },
})