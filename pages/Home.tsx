import React, { Component } from 'react';
import { StyleSheet, View, Text, YellowBox, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMenu from '../shared/AppMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect, disconnect } from '../services/socket';
import { GlobalState } from '../shared/GlobalState';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

YellowBox.ignoreWarnings([ 
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

export default class Home extends Component { 
  constructor(props:any) { 
    super(props);
  } 

  state = { 
    open: true,
    userList: []
  }

  componentDidMount() {   
    this.setState({userList: []});
    if(!this.context.isConnected) {
      let name = this.props.route.params.name; 
      connect(name, (userList:any) => {     
        this.setState({userList: this.context.updateUserList(userList)}); 
        this.setState({isConnected: this.context.updateIsConnected(true)}); 
      }) 
    }
  }

  componentWillUnmount() {
    //this.setState({userList: []});
    //disconnect();
  } 

  render() {
    return ( 
      <>
     <View style={styles.mainContainer}>
        <AppMenu nav={this.props.navigation}></AppMenu>

        <ScrollView style={styles.listContainer}>
          <View style={styles.listItem}>
            { this.context.userList.map((item:any, i:any) => (
              <View key={item.id} style={(i === (this.context.userList.length - 1)) ? styles.textContainer_last : styles.textContainer}>
                <Text style={styles.listTextLeft}>{item.name}</Text>
                <Icon 
                name={'chevron-circle-down'}
                size={30}
                color='#000000'
                />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      </>
    );
  }
}

Home.contextType = GlobalState;

const styles = StyleSheet.create({
  openButton: {
    flex: 1,
    top: 30,
    right: 30,
    zIndex: 5,
    position: 'absolute',
    backgroundColor: '#F04812' 
  },
  mainContainer: {
    flex: 1
  },
  textInput: {
    padding: 10,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15
  }, 
  listContainer: {
    left: 0,
    right: 0,
    top: 0,
    height: Dimensions.get('window').height - 200,
    position: 'absolute'
  },
  listItem: {
    flexDirection: 'column'
  },
  textContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1
  }, 
  textContainer_last: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 0
  },
  listTextLeft: {
    fontSize: 18,
    flex: 1,
    alignContent: 'flex-end',
  },
  listTextRight: {
    fontSize: 18,
    flex: 1,
    alignContent: 'flex-end',
    textAlign: 'right'
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  }
  
});