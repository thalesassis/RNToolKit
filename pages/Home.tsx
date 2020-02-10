import React, { Component } from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

class Home extends Component {
  render() {
    return (
      <>
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 23 }}> Home </Text>
      </View>
      </>
    );
  }
}

const Stack = createStackNavigator();
export default class HomeScreen extends Component {
  render() {
    return (
      <>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={{
          headerRight: () => (
            <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#fff"
            />
          ),
        }} />
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