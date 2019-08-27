import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,TextInput,Platform,TouchableOpacity} from 'react-native';
import { CheckBox} from 'react-native-elements';
import {list} from '../assets/data';
import FeedItem from '../components/FeedItem';
import { Ionicons } from '@expo/vector-icons';



export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckRating:true,
      isCheckAround:false,
      listArticles:list,
      search:'',
    };
  }

  updateSearch = search => {
    this.setState({search});
  };

  iconSearch =()=>{
    return(
      <View>

      </View>
    );
  }

  renderItem=({item})=>{
    return <FeedItem item={item} />
  };

  render() {
    const {listArticles,isCheckAround,isCheckRating,search} = this.state;
    console.log("--------------"+search)
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <View style={styles.containerSearch}>
            <TouchableOpacity style={styles.iconSearch} onPress={()=>this.updateSearch}>
              <Ionicons
                name={
                  Platform.OS === 'ios' ? 'ios-search':'md-search'
                }
                size={30}/>             
            </TouchableOpacity>
            <TextInput style={styles.inputSearch}
              placeholder='Tìm kiếm'
              onChangeText={this.updateSearch}
              value={search}
            />
          </View>
          <TouchableOpacity style={styles.IconMenu}>
            <Ionicons 
              name={
                Platform.OS === 'ios' ? 'ios-menu':'md-menu'
              }
              size={30}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.checkbox}>
          <CheckBox 
              title='HOT RATING'
              checkedColor='green'
              checked={isCheckRating}
              onPress={() => this.setState({isCheckRating: !isCheckRating})}
          />
          <CheckBox 
            title='QUANH ĐÂY'
            checkedColor='green'
            checked={isCheckAround}
            onPress={() => this.setState({isCheckAround: !isCheckAround})}
          />
        </View>
        <View style={styles.content}>
            <Text style={styles.label}>Đề xuất cho bạn</Text>
            <FlatList
              data={listArticles}
              renderItem={this.renderItem}
              //keyExtractor={item => item.name}
            />
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search:{
    marginTop:'6%',
    flex:0.1,
    backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  checkbox:{
    flex:0.13,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  content:{
    flex:0.77,
    //backgroundColor:'green'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontFamily:'sans-serif',
    fontWeight:'200',
    marginHorizontal:'3%'
  },
  containerSearch:{
    // marginTop:'3%',
      height:42,
     flexDirection:'row',
     flex:0.9,
     borderRadius:10,
     backgroundColor:'gray',
     marginHorizontal:'2%',
     alignItems:'center'
    // height:34
  },
  inputSearch:{
    flex:0.91,
    backgroundColor:'yellow',
    height:'75%',
    fontSize:16,
    marginRight:'1%'
  },
  iconSearch:{
    marginLeft:'2%',
    flex:0.09,
    backgroundColor:'blue'
  },
  IconMenu:{
    flex:0.1,
  }
});
