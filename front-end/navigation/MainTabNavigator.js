import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import InfoScreen from '../screens/InfoScreen';
import History from '../components/History';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
    Info: InfoScreen,
    
  },
  config
);

 HomeStack.navigationOptions = {
    header: null,
};
 HomeStack.path = '';


const history = createDrawerNavigator(
  {
    Initial: HomeStack
  },
  {
    contentComponent: History,
    drawerPosition:'right'
  },
  
);

export default history;
