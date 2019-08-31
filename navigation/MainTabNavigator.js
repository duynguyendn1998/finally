import React from 'react';
import { Platform,View,Text} from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import History from '../components/History';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Login: LoginScreen,
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-home':'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const tabNavigator = createBottomTabNavigator({   
   HomeStack,
},{
  tabBarOptions:{
    showLabel:false
  }
});

tabNavigator.path = '';

const history = createDrawerNavigator(
  {
    Initial: tabNavigator
  },
  {
    contentComponent: History,
    drawerPosition:'right'
  },
  
);

export default history;
