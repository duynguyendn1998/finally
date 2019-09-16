import React from 'react';
import {createStackNavigator} from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import Splash1Screen from '../screens/Splash1Screen';
import Splash2Screen from '../screens/Splash2Screen';
import Splash3Screen from '../screens/Splash3Screen';

const LogInStack = createStackNavigator(
  {
    Splash1:Splash1Screen,
    Splash2:Splash2Screen,
    Splash3:Splash3Screen,
    Login: LoginScreen,
  },
);


export default LogInStack;