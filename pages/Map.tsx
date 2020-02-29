import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TopBar from '../shared/TopBar';
import Menu from '../shared/Menu';

export default class Map extends Component {
  render() {
    return (
      <>
      <View style={styles.MainContainer}>
        <Menu nav={this.props.navigation}></Menu>
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