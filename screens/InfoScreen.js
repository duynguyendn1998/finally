import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet,View, Text } from 'react-native';
import SearchBar from '../components/SearchBar';
import FeedItem from '../components/FeedItem';
export default class InfoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <SearchBar menu={this.props.navigation.openDrawer}/>
        </View>

        <TouchableOpacity style={styles.article}>
            <FeedItem item={this.props.navigation.getParam('item')} />
          </TouchableOpacity>
      </View>
    );
  }
}

InfoScreen.navigationOptions = {
  title:"Info"
  //header: null,
};
const styles= StyleSheet.create({
  article:{
    flex:0.3,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  search:{
    marginTop:'6%',
    flex:0.1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
})