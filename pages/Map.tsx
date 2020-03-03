import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TopBar from '../shared/TopBar';
import AppMenu from '../shared/AppMenu';

export default class Map extends Component {
  render() {
    return (
      <>
      <View style={styles.MainContainer}>
        <AppMenu nav={this.props.navigation}></AppMenu>
        <Text style={{ fontSize: 23 }}> Map </Text>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
});