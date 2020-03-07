import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Permissions from './pages/Permissions';
import Home from './pages/Home';
import Map from './pages/Map';
import Chat from './pages/Chat';

const Stack = createStackNavigator();
export default class Routes extends Component {
  render() {
    return (
      <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: true}}>
          <Stack.Screen name="Permissions" component={Permissions} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
      </>
    );
  }
}