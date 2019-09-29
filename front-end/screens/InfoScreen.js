import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Text, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeedItem from '../components/FeedItem';
import { AntDesign } from '@expo/vector-icons';
export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      content: false,
      see: 'Xem thêm',
      item: this.props.navigation.getParam('item'),
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
    if(this.state.item.amount !== undefined){
      return (
        <View style={styles.WrapperSeeMore}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textSeeMore}>Địa chỉ:</Text>
            <Text style={styles.textInfoSeeMore}>{this.state.item.store_address}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textSeeMore}>Thể loại:</Text>
            <Text style={styles.textInfoSeeMore}>{this.state.item.category}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.textSeeMore}>Thanh toán:</Text>
            <Text style={styles.textInfoSeeMore}>{this.state.item.amount}</Text>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.WrapperSeeMore}>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textSeeMore}>Địa chỉ:</Text>
          <Text style={styles.textInfoSeeMore}>{this.state.item.store_address}</Text>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.textSeeMore}>Thể loại:</Text>
          <Text style={styles.textInfoSeeMore}>{this.state.item.category}</Text>
        </View>
      </View>
    )
  };
  componentHideAndShow = async () => {
    await this.setState({ content: !this.state.content })
    if (this.state.content === true)
      this.setState({ see: 'Ẩn bớt' })
    else
      this.setState({ see: 'Xem thêm' })
  }

  render() {
    const {see,content}=this.state;
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
            <AntDesign name="arrowleft" size={27} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Thông tin sản phẩm</Text>
        </View>
        <View style={styles.article}>
          <FeedItem item={this.props.navigation.getParam('item')} />
        </View>
        <TouchableOpacity style={styles.hint} onPress={this.componentHideAndShow}>
          <Text style={styles.lable}>{see}</Text>
        </TouchableOpacity>
        <View>
          {content ? <this._seeAdd /> : null}
        </View>
        <MapView style={{ flex: 0.7, marginHorizontal: '3%' }} region={region}>
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
    // backgroundColor:'red',
    flexDirection: 'row',
    alignItems: 'center'
  },
  textTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    marginLeft: 30,
    // fontFamily:'sans-serif',
  },
  hint: {
    flex: 0.028,
    marginHorizontal: '3%',
    flexDirection:'row-reverse',
  },
  lable: {
    color: '#ED3E7A',
    textDecorationLine: 'underline'
  },
  article: {
    marginHorizontal: '3%',
    flex: 0.18,
    //backgroundColor:'red'
  },
  WrapperSeeMore:{
    marginHorizontal:'3%',
    marginVertical: '1%',
    justifyContent:'flex-start'
    //backgroundColor:'red',
  },
  textSeeMore:{
    fontSize:16,
    fontWeight:'bold',
    //justifyContent:'flex-start'
  },
  textInfoSeeMore:{
    width:300,
  }
})