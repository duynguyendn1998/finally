import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import History from '../components/History';
import UserScreen from '../screens/UserScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SupportScreen from '../screens/SupportScreen';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const UserStack = createStackNavigator(
  {
    User: UserScreen,
    History: HistoryScreen,
  }
);
UserStack.navigationOptions = {
  header:null
};
UserStack.path = '';
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Info: InfoScreen,
    User:UserStack,
    Support:SupportScreen,
  },
  config
);
HomeStack.navigationOptions = {
  header: null,
};
HomeStack.path = '';

export default HomeStack ;