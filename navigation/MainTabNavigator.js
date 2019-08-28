import React from 'react';
import { Platform,View,Text} from 'react-native';
import { createStackNavigator, createBottomTabNavigator,createDrawerNavigator} from 'react-navigation';

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

const Drawer = () => (
 <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Drawer Item 1</Text>
    <Text>Drawer Item 2</Text>
  </View>
);

const drawer = createDrawerNavigator(
  {
    Initial: tabNavigator
  },
  {
    contentComponent: Drawer,
    drawerPosition:'right'
  },
  
);

export default drawer;
