import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeedItem from '../components/FeedItem';
export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      content: false,
      item:this.props.navigation.getParam('item'),
    };
  }
  async componentWillMount() {
    let location = {
      lat: this.props.navigation.getParam('item').latitude,
      lng: this.props.navigation.getParam('item').longitude
    }
    this.setState({
      location
    });
  }
  _seeAdd = () => {
    return (
      <View>
        <Text>Địa chỉ: {this.state.item.store_address}</Text>
        <Text>Thể loại: {this.state.item.category}</Text>
      </View>
    )
  };
  componentHideAndShow = () => {
    this.setState(previousState => ({ content: !previousState.content }))
  }

  render() {
    region = {
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
          <FeedItem item={this.props.navigation.getParam('item')} />
        </View>
        <TouchableOpacity style={styles.hint} onPress={this.componentHideAndShow}>
          <Text style={styles.lable}>Xem thêm</Text>
        </TouchableOpacity>
        <View>
          {this.state.content ? <this._seeAdd /> : null}
        </View>
        <MapView style={{ flex: 0.7, marginHorizontal: '5%' }} region={region}>
          <Marker
            coordinate={coordinate}
            title={this.state.item.store_name}
            description={this.state.item.store_address}
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
const styles = StyleSheet.create({
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
  lable: {
    color: '#ED3E7A',
    textDecorationLine: 'underline'
  },
  article: {
    marginHorizontal: '3%',
    flex: 0.2,
    //  backgroundColor:'red'
  },
})