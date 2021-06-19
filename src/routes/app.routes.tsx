import React from 'react';
import { FunctionComponent } from 'react';
import { View } from 'react-native';

import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import { Container } from './styles';

export const AppRoutes: FunctionComponent = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Register" component={Register} />
    </Navigator>
  );
};
