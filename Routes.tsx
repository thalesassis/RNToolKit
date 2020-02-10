/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();

import HomeScreen from './pages/Home';
import MapScreen from './pages/Map';

const App = () => {   
  return (
    <>
      <NavigationContainer independent={true}>
          <Drawer.Navigator initialRouteName="Main">
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Map" component={MapScreen} />
          </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;