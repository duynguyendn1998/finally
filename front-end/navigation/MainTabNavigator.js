import React from 'react';
import { Text, TouchableOpacity, Button, Platform } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import InfoScreen from '../screens/InfoScreen';
import History from '../components/History';
import Splash1Screen from '../screens/Splash1Screen';
import Splash2Screen from '../screens/Splash2Screen';
import Splash3Screen from '../screens/Splash3Screen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const HistoryStack = createStackNavigator(
  {
    History: History,
    History1: History
  }
);
HistoryStack.navigationOptions = {
  header:null
};
HistoryStack.path = '';
const HomeStack = createStackNavigator(
  {
    // Splash1:Splash1Screen,
    // Splash2:Splash2Screen,
    // Splash3:Splash3Screen,
    Login: LoginScreen,
    Home: HomeScreen,
    Info: InfoScreen,
    History: HistoryStack

  },
  config
);
HomeStack.navigationOptions = {
  header: null,
};
HomeStack.path = '';

export default HomeStack;