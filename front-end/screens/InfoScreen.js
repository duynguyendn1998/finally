import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeedItem from '../components/FeedItem';
import { AntDesign,Entypo,Foundation,MaterialCommunityIcons} from '@expo/vector-icons';

export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      content: false,
      see: 'Xem thêm',
      item: this.props.navigation.getParam('item'),
      contentSeeMap: 0.7,
      contentSeeMore:0,
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
  componentHideAndShow = async () => {
    await this.setState({ content: !this.state.content })
    if (this.state.content === true)
      this.setState({ see: 'Ẩn bớt',contentSeeMap:0.7,contentSeeMore:0 })
    else
      this.setState({ see: 'Xem thêm',contentSeeMap:0.5,contentSeeMore:0.2})
  }
  _seeAdd = () => {
    const {contentSeeMore}=this.state;
    if(this.state.item.amount !== undefined){
      return (
        <View style={[styles.WrapperSeeMore,{flex:contentSeeMore}]}>
          <View style={styles.wrapper}>
            <Entypo name='location-pin' size={25} color='#ED3E7A'/>
            <Text style={styles.textInfoSeeMore}>{this.state.item.store_address}</Text>
          </View>
          <View style={styles.wrapper}>
            <Foundation name='dollar' size={25} color='#ED3E7A'/>
            <Text style={styles.textInfoSeeMore}>{this.state.item.amount}</Text>
          </View>
          <View style={styles.wrapper}>
            <MaterialCommunityIcons name='dictionary' size={25} color='#ED3E7A'/>
            <Text style={styles.textInfoSeeMore}>{this.state.item.category}</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={[styles.WrapperSeeMore,{flex:contentSeeMore}]}>
        <View style={styles.wrapper}>
          <Entypo name='location-pin' size={25} color='#ED3E7A'/>
          <Text style={styles.textInfoSeeMore}>{this.state.item.store_address}</Text>
        </View>
        <View style={styles.wrapper}>
            <MaterialCommunityIcons name='dictionary' size={25} color='#ED3E7A'/>
            <Text style={styles.textInfoSeeMore}>{this.state.item.category}</Text>
        </View>
      </View>
    )
  };

  render() {
    const {see,content,contentSeeMap}=this.state;
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
        <View style={styles.title}>
          <TouchableOpacity onPress={() => this.props.navigation.pop()}>
            <AntDesign name="arrowleft" size={27} color='black'/>
          </TouchableOpacity>
          <Text style={styles.textTitle}>Thông tin sản phẩm</Text>
        </View>
        <View style={styles.article}>
          <FeedItem item={this.props.navigation.getParam('item')} />
        </View>
        <View style={styles.wrapperContent}>
          <TouchableOpacity style={styles.hint} onPress={this.componentHideAndShow}>
            <Text style={styles.lable}>{see}</Text>
          </TouchableOpacity>
          <View>
            {content ? <this._seeAdd /> : null}
          </View>
          <MapView style={{ flex:contentSeeMap, marginHorizontal: '3%'}} region={region}>
            <Marker
              coordinate={coordinate}
              title={this.state.item.store_name}
              description={this.state.item.store_address}
            />
          </MapView>
        </View>
      </View>
    );
  }
}
InfoScreen.navigationOptions = {
  header: null,
};
const styles = StyleSheet.create({
  container: {
    marginTop: '3.5%',
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    flex: 0.08,
    marginTop: '6%',
    marginHorizontal: '2%',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 23,
    fontWeight: '800',
    marginLeft: '18%',
  },
  article: {
    flex: 0.18,
    marginHorizontal: '3%',
  },
  wrapperContent:{
    flex:0.74,
  },
  hint: {
    flex: 0.04,
    marginHorizontal: '4%',
    flexDirection:'row-reverse',
    alignItems:'flex-start',
  },
  lable: {
    color: '#ED3E7A',
    textDecorationLine: 'underline'
  },
  WrapperSeeMore:{
    marginHorizontal:'3%',
    marginVertical: '1%',
    justifyContent:'flex-start',
  },
  textSeeMore:{
    fontSize:16,
    fontWeight:'bold',
  },
  textInfoSeeMore:{
    width:300,
  },
  wrapper:{
  flexDirection:'row',
  alignItems:'flex-end'
  },
})