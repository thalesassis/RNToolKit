import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

class Map extends Component {
  render() {
    return (
      <>
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Map </Text>
      </View>
      </>
    );
  }
}

const Stack = createStackNavigator();
export default class MapScreen extends Component {
  render() {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    marginTop: 50,
    justifyContent: 'center',
  },
});