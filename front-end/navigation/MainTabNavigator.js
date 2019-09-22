import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import InfoScreen from '../screens/InfoScreen';
import History from '../components/History';
import UserScreen from '../screens/UserScreen';

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
    Home: HomeScreen,
    Info: InfoScreen,
    User:UserScreen,
    History: HistoryStack
  },
  config
);
HomeStack.navigationOptions = {
  header: null,
};
HomeStack.path = '';

export default HomeStack ;