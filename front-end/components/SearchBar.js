import React, { Component } from 'react';
import { TextInput,Platform, TouchableOpacity,StyleSheet,View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search:''
    };
  }

  updateSearch = search => {
    this.setState({search});
  };
  render() {
    return (
        <View style={styles.containerSearch}>
            <TouchableOpacity style={styles.iconSearch} onPress={()=>this.updateSearch}>
                <Ionicons
                    name={
                    Platform.OS === 'ios' ? 'ios-search':'md-search'
                    }
                    size={30}
                    color='#bdc3c7'/>             
            </TouchableOpacity>
            <TextInput style={styles.inputSearch}
            placeholder='Tìm kiếm'
            onChangeText={this.updateSearch}
            value={this.state.search}
            />
            <TouchableOpacity style={styles.IconMenu} onPress={this.props.menu}>
            <Ionicons
              name={
                Platform.OS === 'ios' ? 'ios-menu':'md-menu'
              }
              size={30}
            />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerSearch:{
    // marginTop:'3%',
      height:42,
     flexDirection:'row',
     flex:0.9,
     borderRadius:10,
     backgroundColor:'#ececec',
     marginHorizontal:'2%',
     alignItems:'center'
    // height:34
  },
  inputSearch:{
    flex:0.91,
   // backgroundColor:'yellow',
    height:'75%',
    fontSize:16,
    marginRight:'1%'
  },
  iconSearch:{
    marginLeft:'2%',
    flex:0.09,
    //backgroundColor:'blue'
  },
  IconMenu:{
    flex:0.1,
  }
})