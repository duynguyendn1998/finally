import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CheckBox, } from 'react-native-elements';
import FeedItem from '../components/FeedItem';
import SearchDesign from '../components/SearchDesign';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckRating: true,
      isCheckAround: false,
      listArticles: [],
      search: '',
    };
  }
  async componentWillMount() {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    location = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    }
    await this.setState({ location });
    let response = await fetch(`http://127.0.0.1:5000/classify?text=&long=${this.state.location.longitude}&lat=${this.state.location.latitude}`)
    let listArticles = await response.json();
    await this.setState({ listArticles });
  }
  getInfo = (item) => {
    this.props.navigation.navigate('Info', { 'item': item });
  }
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.wrapperContainerItem} onPress={() => this.getInfo(item)}>
        <FeedItem item={item} />
      </TouchableOpacity>
    )
  };

  oncheckRating = props => {
    const { isCheckRating } = this.state;
    const color = isCheckRating === true ? '#ED3E7A' : null;
    const textCheck = { color: color, fontSize: 18 };
    return (
      <CheckBox
        containerStyle={styles.checkStyle}
        textStyle={textCheck}
        title='PHỔ BIẾN'
        size={40}
        checkedColor='#ED3E7A'
        checked={isCheckRating}
        onPress={() => this.setState({ isCheckRating: !isCheckRating })}
      />
    );
  }
  oncheckAround = props => {
    const { isCheckAround } = this.state;
    const color = isCheckAround === true ? '#ED3E7A' : null;
    const textCheck = { color: color, fontSize: 18 };
    return (
      <CheckBox
        containerStyle={styles.checkStyle}
        textStyle={textCheck}
        title='QUANH ĐÂY'
        size={40}
        checkedColor='#ED3E7A'
        checked={isCheckAround}
        onPress={() => this.setState({ isCheckAround: !isCheckAround })}
      />
    );
  }
  updateSearch = async search => {
    await this.setState({ search });
  }
  filterList(e) {
    let name = xoa_dau(e.store_name.toString().toLowerCase());
    let address = xoa_dau(e.store_address.toString().toLowerCase());
    let keyword = xoa_dau(this.state.search.toLowerCase());
    let cat = xoa_dau(e.category.toString().toLowerCase());

    if (name.indexOf(keyword) > -1 || address.indexOf(keyword) > -1 || cat.indexOf(keyword) > -1) {
      return true;
    }
    return false;
  }
  render() {
    let { listArticles } = this.state;
    if (listArticles.length > 0) {
      listArticles = listArticles.filter(e => this.filterList(e))
    }
    if (listArticles.length)
      return (
        <View style={styles.container}>
          <View style={styles.search}>
            <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
          </View>
          <View style={styles.checkbox}>
            <this.oncheckRating />
            <this.oncheckAround />
          </View>
          <View style={styles.content}>
            <Text style={styles.label}>Thèm món này chứ?</Text>
            <FlatList
              data={listArticles}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
        </View>
        <View style={styles.checkbox}>
          <this.oncheckRating />
          <this.oncheckAround />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Thèm món này chứ?</Text>
          <ActivityIndicator />
        </View>
      </View>
    );
  }
}
const xoa_dau = str => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  return str;
}
HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    marginTop: '3.5%',
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    marginTop: '6%',
    flex: 0.1,
    borderBottomWidth: 0.5,
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkStyle: {
    backgroundColor: '#fff',
    borderWidth: 0
  },
  checkbox: {
    flex: 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  wrapperContainerItem: {
    marginHorizontal: '3%',
    borderBottomWidth: 0.5
  },
  content: {
    flex: 0.77,
    //backgroundColor:'green'
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginRight: 10,
    //fontFamily:'sans-serif',
    fontWeight: '200',
    marginHorizontal: '3%'
  },
});
