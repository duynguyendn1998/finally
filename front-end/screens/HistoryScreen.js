import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import { list } from '../assets/data';
import FeedItem from '../components/FeedItem';
import { AntDesign } from '@expo/vector-icons';



export default class HistoryScreen extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      historyList: [],
    };
  }
  async componentWillMount() {
    const historyList = JSON.parse(await AsyncStorage.getItem('historyList'))
    this.setState({historyList});
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

  render() {
    const { historyList } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={() => this.props.navigation.pop()}>
              <AntDesign name="arrowleft" size={27} />
            </TouchableOpacity>
            <Text style={styles.textTitle}>Lịch sử tìm kiếm gần đây</Text>
          </View>
        </View>
        <View style={styles.textLable}>
          <Text style={styles.label}>Bạn đã đến</Text>
        </View>
        <View style={styles.content}>
          <FlatList
            data={historyList}
            renderItem={this.renderItem}
            keyExtractor={(item,index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}

HistoryScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: '1.5%',   
    marginTop: '7%',
    backgroundColor: '#fff',
  },
  title: {
    flex: 0.08,
     marginHorizontal: '2%',
     justifyContent:'center'
  },
  textLable: {
    flex: 0.08,
    flexDirection: 'row',
    alignItems: 'center'
  },
  wrapperContainerItem: {
    marginHorizontal: '3%',
    borderBottomWidth: 0.5
  },
  content: {
    flex: 0.84,
  },
  label: {
    fontSize: 18,
    color: 'black',
    marginRight: 10,
    fontWeight: '200',
    marginHorizontal: '3%'
  },
  textTitle: {
    fontSize: 23,
    fontWeight:500,
    marginLeft: 40,
  }
});
