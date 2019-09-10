import React from 'react';
import { Platform} from 'react-native';
import { createStackNavigator,createDrawerNavigator} from 'react-navigation';

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

const HomeStack = createStackNavigator(
  {
    Splash1:Splash1Screen,
    Splash2:Splash2Screen,
    Splash3:Splash3Screen,
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
