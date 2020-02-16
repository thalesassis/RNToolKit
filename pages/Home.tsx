import React, { Component, useEffect } from 'react';
import { AppState, Button, StyleSheet, View, Text, YellowBox } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TopBar from '../shared/TopBar';
import { connect, disconnect } from '../services/socket';

YellowBox.ignoreWarnings([ 
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

class Home extends Component { 
  
  componentDidMount() { 
    disconnect();    
    connect();
  }

  componentWillUnmount() {
    disconnect();
  } 


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
        <Stack.Navigator screenOptions={{ 
          headerRight: () => (
            <TopBar nav={this.props.navigation} />
          )
        }}>
          <Stack.Screen name="Home" component={Home} />
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