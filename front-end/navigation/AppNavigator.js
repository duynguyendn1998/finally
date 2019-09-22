import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {Image,AsyncStorage,View,StyleSheet} from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import LogInStack from './LogInStack'


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  loadingData= async ()=>{
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn !=='1' ? 'Auth':'Main')
  }

  componentDidMount(){
    setTimeout(()=>{
      this.loadingData()
    },1500)
  }
  render() {
      return (
        <View style={styles.container} >
        <Image  style={{width: 100, height: 100}}
          source={require('../assets//images//momoicon.png')}/>
        </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  item: {},
  btn: {
    backgroundColor: "#480032",
    width: 100,
    height: 40,
    padding: 3,
    justifyContent: "center",
    borderRadius: 6
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center"
  },
  item1: {
    backgroundColor: "red",
    padding: 20,
    width: 100,
    margin: 10
  },

  textBtn: {
    color: "#f4f4f4",
    fontWeight: "bold",
    textAlign: "center"
  }
})
export default createAppContainer(
  createSwitchNavigator({
    AuthLoading:AuthLoadingScreen,
    //App:LogInStack,
    Auth:LogInStack,
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
  },
  {
      initialRouteName: 'AuthLoading'
  }
  )
);
