import * as React from 'react';
//import NavigationService from './navigation/NavigationService';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';

import MainStack from './MainStack';

const Stack = createStackNavigator();

export default function Routes() {

  return (
    <NavigationContainer>
      <Stack.Navigator>{MainStack(Stack)}</Stack.Navigator>
    </NavigationContainer>
  );
}

