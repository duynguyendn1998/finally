import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
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

export default tabNavigator;
