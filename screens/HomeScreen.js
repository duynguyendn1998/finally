import React, { Component } from 'react';
import { View, Text,StyleSheet,FlatList} from 'react-native';
import { CheckBox} from 'react-native-elements';
import {list} from '../assets/data';
import FeedItem from '../components/FeedItem';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCheckRating:true,
      isCheckAround:false,
      listArticles:list,
    };
  }

  renderItem=({item})=>{
    return <FeedItem item={item} />
  };

  render() {
    const {listArticles}= this.state;
    return (
      <View style={styles.container}>
        <View style={styles.search}>
    
        </View>
        <View style={styles.checkbox}>
          <CheckBox 
              title='HOT RATING'
              checkedColor='green'
              checked={this.state.isCheckRating}
              onPress={() => this.setState({isCheckRating: !this.state.isCheckRating})}
          />
          <CheckBox 
            title='QUANH ĐÂY'
            checkedColor='green'
            checked={this.state.isCheckAround}
            onPress={() => this.setState({isCheckAround: !this.state.isCheckAround})}
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
    flex:0.14,
    backgroundColor:'red'
  },
  checkbox:{
    flex:0.11,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
  },
  content:{
    flex:0.75,
    backgroundColor:'green'
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginRight: 10,
    fontFamily:'sans-serif',
    fontWeight:'200',
    marginHorizontal:'3%'
  },
});
