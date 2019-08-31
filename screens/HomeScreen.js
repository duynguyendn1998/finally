import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,Platform,TouchableOpacity,Image} from 'react-native';
import { CheckBox} from 'react-native-elements';
import {list} from '../assets/data';
import FeedItem from '../components/FeedItem';
import { Ionicons } from '@expo/vector-icons';
import SearchBar from '../components/SearchBar';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckRating:true,
      isCheckAround:false,
      listArticles:list,
    };
  }

  iconSearch =()=>{
    return(
      <View>

      </View>
    );
  }

  // checkedBox = props =>{
  //   const name = props.id ==='2' ? 'QUANH ĐÂY':'HOT RATING';
  //    return (
  //       <CheckBox 
  //             containerStyle={styles.checkStyle}
  //             title={name}
  //             checkedColor='green'
  //       />
  //   );
  // };
  getInfo = (item) =>{
    this.props.navigation.navigate('Info',{'item':item});
  }
  renderItem=({item})=>{
    return (
      <TouchableOpacity onPress={ () => this.getInfo(item)}>
        <FeedItem item={item} />
      </TouchableOpacity>
    )
  
  };

  render() {
    const {listArticles,isCheckAround,isCheckRating,search} = this.state;
    return (
      <View style={styles.container}>
        
        <View style={styles.search}>
          <SearchBar menu={this.props.navigation.openDrawer}/>
        </View>
        <View style={styles.checkbox}>
          <CheckBox 
              containerStyle={styles.checkStyle}
              title='HOT RATING'
              checkedColor='green'
              checked={isCheckRating}
              onPress={() => this.setState({isCheckRating: !isCheckRating})}
          />
          <CheckBox 
            containerStyle={styles.checkStyle}
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
              keyExtractor={item => item.name}
            />
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  title:"Home"
  //header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search:{
    marginTop:'6%',
    flex:0.1,
   // backgroundColor:'red',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  checkStyle:{
    backgroundColor:'#fff',
    borderWidth:0
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
    //fontFamily:'sans-serif',
    fontWeight:'200',
    marginHorizontal:'3%'
  },
});
