import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList,TouchableOpacity,Image} from 'react-native';
import { CheckBox, } from 'react-native-elements';
import {list} from '../assets/data';
import FeedItem from '../components/FeedItem';
import SearchDesign from '../components/SearchDesign';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckRating:true,
      isCheckAround:false,
      listArticles:list,
    };
  }
  getInfo = (item) =>{
    this.props.navigation.navigate('Info',{'item':item});
  }
  renderItem=({item})=>{
    return (
      <TouchableOpacity style={styles.wrapperContainerItem} onPress={ () => this.getInfo(item)}>
        <FeedItem item={item} />
      </TouchableOpacity>
    )
  };

  oncheckRating= props => {
    const {isCheckRating}=this.state;
    const color = isCheckRating === true ? '#ED3E7A':null;
    const textCheck={color:color,fontSize:18};
    return(
      <CheckBox
        containerStyle={styles.checkStyle}
        textStyle={textCheck}
        title='PHỔ BIẾN'
        size={40}
        checkedColor='#ED3E7A'
        checked={isCheckRating}
        onPress={() => this.setState({isCheckRating: !isCheckRating})}
      />
    );
  }
    oncheckAround= props => {
      const {isCheckAround}=this.state;
      const color = isCheckAround === true ? '#ED3E7A':null;
      const textCheck={color:color,fontSize:18};
      return(
        <CheckBox
          containerStyle={styles.checkStyle}
          textStyle={textCheck}
          title='QUANH ĐÂY'
          size={40}
          checkedColor='#ED3E7A'
          checked={isCheckAround}
          onPress={() => this.setState({isCheckAround: !isCheckAround})}
        />
      );
  }

  render() {
    const {listArticles} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchDesign menu={() =>this.props.navigation.navigate('User')}/>
        </View>
        <View style={styles.checkbox}>
          <this.oncheckRating/>
          <this.oncheckAround/>
        </View>
        <View style={styles.content}>
            <Text style={styles.label}>Thèm món này chứ?</Text>
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
  header:null,
};

const styles = StyleSheet.create({
  container: {
    marginTop:'3.5%',
    flex: 1,
    backgroundColor: '#fff',
  },
  search:{
    marginTop:'6%',
    flex:0.1,
    borderBottomWidth:0.5,
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
    flex:0.10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  wrapperContainerItem:{
    marginHorizontal:'3%',
    borderBottomWidth:0.5
  },
  content:{
    flex:0.8,
    //backgroundColor:'green'
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginRight: 10,
    //fontFamily:'sans-serif',
    fontWeight:'200',
    marginHorizontal:'3%'
  },
});
