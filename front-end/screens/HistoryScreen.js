import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import FeedItem from '../components/FeedItem';
import { list } from '../assets/data';
export default class HistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
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
        return (
            <View>
                <Text style={{ padding: 20 }}> Bạn đã tìm kiếm </Text>
                <View>
                    <FlatList
                        data={list}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name}
                    />
                </View>
            </View>
        );
    }
}

HistoryScreen.navigationOptions = ({ navigation }) => {
    return {
        //   header: null,
        title: "Lịch sử giao dịch gần đây"
    }
};

const styles = StyleSheet.create({
    wrapperContainerItem: {
        marginHorizontal: '3%',
        borderBottomWidth: 0.5
    },
})