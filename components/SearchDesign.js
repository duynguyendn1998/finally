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
          round
          containerStyle={style={backgroundColor:'white'}}
          inputStyle={styles.inputSearch}
          onChangeText={this.updateSearch}
          placeholder='Nhập từ khóa tìm kiếm'
          value={this.state.search} 
           />
        </View>
       
        {/* <View >
            <TouchableOpacity style={styles.iconSearch} onPress={()=>this.updateSearch}>
              <Ionicons
                    name={
                    Platform.OS === 'ios' ? 'ios-search':'md-search'
                    }
                    size={27}
                    color='#666263'/>             
            </TouchableOpacity>
            <TextInput style={styles.inputSearch}
            placeholder='Nhập từ khóa tìm kiếm'
            onChangeText={this.updateSearch}
            value={this.state.search}
            />
        </View> */}
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
    marginRight:'1%'
  },
  containerSearch:{
      flex:0.93,
  },
  inputSearch:{
     backgroundColor:'white'
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