import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import { CheckBox, } from 'react-native-elements';
import FeedItem from '../components/FeedItem';
import SearchDesign from '../components/SearchDesign';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { api } from '../config';
import { TabView, SceneMap } from 'react-native-tab-view';
export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckRating: true,
      isCheckAround: false,
      listArticles: [],
      search: '',
      index: 0,
      routes: [
      { key: 'first', title: 'Fisrt' },
      { key: 'second', title: 'Second' },
    ],
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
    //history
    const user_id = await AsyncStorage.getItem('user_id');
    let response = await fetch(api + `/user?user_id=${user_id}&long=${this.state.location.longitude}&lat=${this.state.location.latitude}`);
    let historyList = await response.json();
    await AsyncStorage.setItem('historyList', JSON.stringify(historyList));
    await this.getList();
  }
  getList = async (page = 1) => {
    console.log(page)
    if (page === 1) {
      await this.setState({
        listArticles: []
      })
    }
    await this.setState({ page })
    if (this.state.isCheckAround && page === 1) {
      response = await fetch(api + `/search?text=&long=${this.state.location.longitude}&lat=${this.state.location.latitude}&page=${page}`)
      let listArticles = this.state.listArticles.concat(await response.json());
      await this.setState({ listArticles });
      this.getAllArticle();
    }
    if (this.state.isCheckRating) {
      response = await fetch(api + `/predict?long=${this.state.location.longitude}&lat=${this.state.location.latitude}&page=${page}`)
      let listArticles = this.state.listArticles.concat(await response.json());
      await this.setState({ listArticles });

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
  onCheck = async () => {
    await this.setState({
      isCheckRating: !this.state.isCheckRating,
      isCheckAround: !this.state.isCheckAround
    })
    await this.getList()
  }
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
        onPress={this.onCheck}
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
        onPress={this.onCheck}
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
  async getAllArticle() {
    if (this.state.isCheckAround) {
      response = await fetch(api + `/search?text=&long=${this.state.location.longitude}&lat=${this.state.location.latitude}`);
      let listArticles = await response.json();
      this.setState({ listArticles });
    }
  }
  FirstRoute = () => (
    <View style={styles.container}>
    <View style={styles.search}>
      <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
    </View>
    <View style={styles.checkbox}>
      <this.oncheckRating />
      <this.oncheckAround />
    </View>
    <View style={styles.content}>
      <Text style={styles.label}>Có thể bạn sẽ thích</Text>
      <FlatList
        onEndReached={() => this.getList(this.state.page + 1)}
        onEndReachedThreshold={0.1}
        data={this.state.listArticles}
        renderItem={this.renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  </View>
  );
  
  SecondRoute = () => (
    <View style={styles.container}>
        <View style={styles.search}>
          <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
        </View>
        <View style={styles.checkbox}>
          <this.oncheckRating />
          <this.oncheckAround />
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Có thể bạn sẽ thích</Text>
          <Text style={{textAlign:"center",marginTop:"10%",fontSize:18}}>Không có kết quả</Text>
        </View>
      </View>
    );
  render() {
    let { listArticles } = this.state;
    if (listArticles.length > 0) {
      listArticles = listArticles.filter(e => this.filterList(e))
    }

    //if (listArticles.length)
  //     return (
  //       <View style={styles.container}>
  //         <View style={styles.search}>
  //           <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
  //         </View>
  //         <View style={styles.checkbox}>
  //           <this.oncheckRating />
  //           <this.oncheckAround />
  //         </View>
  //         <View style={styles.content}>
  //           <Text style={styles.label}>Có thể bạn sẽ thích</Text>
  //           <FlatList
  //             onEndReached={() => this.getList(this.state.page + 1)}
  //             onEndReachedThreshold={0.1}
  //             data={listArticles}
  //             renderItem={this.renderItem}
  //             keyExtractor={(item, index) => index.toString()}
  //           />
  //         </View>
  //       </View>
  //     );
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.search}>
  //         <SearchDesign search={this.state.search} updateSearch={this.updateSearch} menu={() => this.props.navigation.navigate('User')} />
  //       </View>
  //       <View style={styles.checkbox}>
  //         <this.oncheckRating />
  //         <this.oncheckAround />
  //       </View>
  //       <View style={styles.content}>
  //         <Text style={styles.label}>Có thể bạn sẽ thích</Text>
  //         <Text style={{textAlign:"center",marginTop:"10%",fontSize:18}}>Không có kết quả</Text>
  //       </View>
  //     </View>
  //   );
  return (
    <TabView
      navigationState={this.state}
      renderScene={SceneMap({
        first: this.FirstRoute,
        second: this.SecondRoute,
      })}
      onIndexChange={index => this.setState({ index })}
      // initialLayout={{ width: Dimensions.get('window').width }}
    />
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
  scene: {
    flex: 1,
  },
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
