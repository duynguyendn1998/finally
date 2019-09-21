import React from 'react';
import { createAppContainer, createSwitchNavigator,createStackNavigator } from 'react-navigation';
import { ActivityIndicator,StatusBar,AsyncStorage,View } from 'react-native';

import MainTabNavigator from './MainTabNavigator';
import LogInStack from './LogInStack'


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.loadingData();
  }

  loadingData= async ()=>{
    const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    this.props.navigation.navigate(isLoggedIn !=='1' ? 'Auth':'Main')
  }
  render() {
    return (
      <View >
        <ActivityIndicator/>
        <StatusBar barStyle='default'/>
      </View>
    );
  }
}

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


