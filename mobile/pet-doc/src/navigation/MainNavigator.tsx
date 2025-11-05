import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {MainTabParamList} from './types';
import {colors} from '@theme/colors';

// Import Stack Navigators for each tab
import HomeStackNavigator from './stacks/HomeStackNavigator';
import ServicesStackNavigator from './stacks/ServicesStackNavigator';
import CommunityStackNavigator from './stacks/CommunityStackNavigator';
import MarketplaceStackNavigator from './stacks/MarketplaceStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ServicesTab"
        component={ServicesStackNavigator}
        options={{
          tabBarLabel: 'Services',
          tabBarIcon: ({color, size}) => (
            <Icon name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CommunityTab"
        component={CommunityStackNavigator}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-group" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MarketplaceTab"
        component={MarketplaceStackNavigator}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: ({color, size}) => (
            <Icon name="shopping" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
