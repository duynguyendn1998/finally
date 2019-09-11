import React, { Component } from 'react';
import { TextInput,Platform, TouchableOpacity,StyleSheet,View, Text } from 'react-native';
import { Ionicons,Entypo } from '@expo/vector-icons';
import { SearchBar} from 'react-native-elements';
import { ThemeColors } from 'react-navigation';
export default class SearchDesign extends Component {
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
      <View style={styles.container}>
        <View style={styles.containerSearch}> 
          <SearchBar
            lightTheme round 
            containerStyle={style=styles.containerStyle}
            inputStyle={styles.inputSearch}
            onChangeText={this.updateSearch}
            placeholder='Nhập từ khóa tìm kiếm'
            value={this.state.search} 
           />
        </View>
      <TouchableOpacity style={styles.IconMenu} onPress={this.props.menu}>
        <Entypo
          name='dots-three-vertical'
          size={27} color='#868686'
        />
      </TouchableOpacity>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'row',
    marginRight:'1%',
  },
  containerStyle:{
    marginLeft:'1%',
    backgroundColor:"#fff",
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },
  containerSearch:{
      flex:0.93,
  },
  inputSearch:{
    color:'#000'
  },
  outputSearch:{
    backgroundColor:'white'
  },
  IconMenu:{
    flex:0.06,
    backgroundColor:'white',
    justifyContent:'center',
    alignItems: 'center',
  }
})