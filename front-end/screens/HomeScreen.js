import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import FeedItem from '../components/FeedItem';
import SearchDesign from '../components/SearchDesign';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { api } from '../config';
// import {list} from '../assets/data';
import { TabBar,TabView, SceneMap } from 'react-native-tab-view';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckRating: true,
      isCheckAround: false,
      listArticles:[],
      search: '',
      index: 0,
      routes: [
        { key: 'isCheckRating', title: 'PHỔ BIẾN'},
        { key: 'isCheckAround', title: 'QUANH ĐÂY' },
      ],
    };
  }

  renderTabBar(props) {
    return (<TabBar
    style={styles.tab}
    labelStyle={styles.textStyle}
    {...props}
    indicatorStyle={{backgroundColor: '#ED3E7A', height: 2.8}}
    />
    );
    }
  async componentWillMount() {
    let status = await Permissions.askAsync(Permissions.LOCATION);
    let location = await Location.getCurrentPositionAsync({});
    location = {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude
    }
    await this.setState({ location });
    //history
    const user_id = await AsyncStorage.getItem('user_id');
    try{
      let response = await fetch(api + `/user?user_id=${user_id}&long=${this.state.location.longitude}&lat=${this.state.location.latitude}`);
      let historyList = await response.json();
      await AsyncStorage.setItem('historyList', JSON.stringify(historyList));
      await this.getList();
    } catch(e){
      console.log(e)
    }
  }
  getList = async (page = 1) => {
    if (page === 1) {
      await this.setState({
        listArticles: []
      })
    }
    await this.setState({ page })
    if (this.state.isCheckAround && page===1) {
      try{
        let response = await fetch(api + `/search?text=&long=${this.state.location.longitude}&lat=${this.state.location.latitude}&page=${page}`)
        let listArticles = this.state.listArticles.concat(await response.json());
        await this.setState({ listArticles });
        this.getAllArticle();
      } catch(e){
        console.log(e)
      }
    }
    if (this.state.isCheckRating) {
      try{
        let response = await fetch(api + `/predict?long=${this.state.location.longitude}&lat=${this.state.location.latitude}&page=${page}`)
        let listArticles = this.state.listArticles.concat(await response.json());
        await this.setState({ listArticles });
      } catch(e){
        console.log(e)
      }
    }
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
  onCheck = async (index) => {
    await this.setState({
      index,
      isCheckRating: !this.state.isCheckRating,
      isCheckAround: !this.state.isCheckAround
    })
   await this.getList()
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
  async getAllArticle() {
    if (this.state.isCheckAround) {
      response = await fetch(api + `/search?text=&long=${this.state.location.longitude}&lat=${this.state.location.latitude}`);
      let listArticles = await response.json();
      this.setState({ listArticles });
    }
  }
  render() {
    let { listArticles } = this.state;
    const FirstRoute = () => (
      <View style={styles.content}>
        <Text style={styles.label}>Thèm món này chứ?</Text>
        <FlatList style={{flex:0.93}}
          onEndReached={() => this.getList(this.state.page + 1)}
          onEndReachedThreshold={0.1}
          data={listArticles.filter(e=>this.filterList(e))}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
    const SecondRoute = () => (
      <View style={styles.content}>
        <Text style={styles.label}>Thèm món này chứ?</Text>
        <FlatList style={{flex:0.92}}
          data={listArticles}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
    const FirstRoute1 = () => (
      <View style={styles.content}>
        <Text style={styles.label}>Thèm món này chứ?</Text>
        <Text style={{textAlign:'center',marginTop:20, fontSize:18}}>Không tìm thấy kết quả</Text>
      </View>
    );
    const SecondRoute1 = () => (
      <View style={styles.content}>
        <Text style={styles.label}>Thèm món này chứ?</Text>
        <Text style={{textAlign:'center',marginTop:20, fontSize:18}}>Không tìm thấy kết quả</Text>
      </View>
    );
    if (listArticles.length > 0) {
      listArticles = listArticles.filter(e => this.filterList(e))
    }
    if (listArticles.length)
    {
      return (
        <View style={styles.container}>
        <View style={styles.search}>
            <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
        </View>
        <TabView 
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderScene={SceneMap({
            isCheckRating: FirstRoute,
            isCheckAround: SecondRoute,
          })}
          onIndexChange={this.onCheck}
        />
        </View>
      );
    }
    else{
      return (
        <View style={styles.container}>
        <View style={styles.search}>
            <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
        </View>
        <TabView
          renderTabBar={this.renderTabBar}
          navigationState={this.state}
          renderScene={SceneMap({
            isCheckRating: FirstRoute1,
            isCheckAround: SecondRoute1,
          })}
          onIndexChange={index => this.setState({ index })}
        />
        </View>
      );
    }
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
    marginTop: '4%',
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    marginTop: '6%',
    flex: 0.1,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapperContainerItem: {
    marginHorizontal: '3%',
    borderBottomWidth: 0.5
  },
  content: {
    flex: 1,
    marginBottom:'2%',
    marginTop:'2.5%',
  },
  label: {
    flex:0.07,
    fontSize: 18,
    color: 'black',
    marginRight: 10,
    fontWeight: '200',
    marginHorizontal:'3%'
  },
  tab:{
  height:55,
  backgroundColor: '#FFFFFF', 
  elevation: 0,
  borderColor:'#ED3E7A',
  borderBottomWidth: 0.5,
  justifyContent:'center'
  },
  textStyle:{
    color: 'black',
    fontSize: 18, 
    fontWeight: 'bold'
  }
});
