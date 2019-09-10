import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet,View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import SearchBar from '../components/SearchDesign';
import FeedItem from '../components/FeedItem';
export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location:{}
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
        <View style={styles.search}>
          <SearchBar menu={this.props.navigation.openDrawer}/>
        </View>
        <TouchableOpacity style={styles.article}>
          <FeedItem item={this.props.navigation.getParam('item')} />
        </TouchableOpacity>
        <MapView style={{flex: 1}} region={region}>
          <Marker 
            coordinate={coordinate}
          />
        </MapView>
      </View>
    );
  }
}

InfoScreen.navigationOptions = {
  header: null,
};
const styles= StyleSheet.create({
  article:{
    flex:0.3,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  search:{
    marginTop:'6%',
    flex:0.1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
})