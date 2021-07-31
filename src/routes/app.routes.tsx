import React from 'react';
import { FunctionComponent } from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import { Register } from '../screens/Register';
import { Dashboard } from '../screens/Dashboard';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

// import { Container } from './styles';

export const AppRoutes: FunctionComponent = () => {
  const { Navigator, Screen } = createBottomTabNavigator();

  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: {
          paddingBottom: Platform.OS === 'ios' ? 30 : 0,
          paddingHorizontal: 10,
          height: 90,
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Listagem',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: 'Cadastrar',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="attach-money" size={size} color={color} />
          ),
        }}
      />

      <Screen
        name="Resume"
        component={Register}
        options={{
          tabBarLabel: 'Resumo',
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="pie-chart" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
