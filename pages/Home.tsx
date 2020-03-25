import React, { Component, useCallback } from 'react';
import { StyleSheet, View, Text, YellowBox, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMenu from '../shared/AppMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import { GlobalState } from '../shared/GlobalState';
import { connectSocket } from '../services/socket';
import Menu, { MenuItem, MenuDivider, Position } from "react-native-enhanced-popup-menu";

YellowBox.ignoreWarnings([ 
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])


export default class Home extends Component { 
  
  static contextType = GlobalState;

  constructor(props:any) { 
    super(props);
  } 
  
  users:any = [];
  state = { 
    open: true,
    userList: []
  }

  componentDidMount() {  
  
    connectSocket(this, () => {

      this.context.state.mySocket.emit("askUserList", this.context.state.myId);

      this.context.state.mySocket.off('askUserList');
      this.context.state.mySocket.on("userList", (userList:any) => {
      
        this.setState(this.context.setState({userList: userList})); 
        for(let user of this.context.state.userList) {      
          let nUser:any = {};
          nUser.id = user.id;      
          nUser.name = user.name;      
          nUser.iconRef = React.createRef();
          nUser.menuRef = React.createRef(); 
          nUser.setMenuRef = ref => nUser.menuRef = ref; 
          nUser.showMenu = () => nUser.menuRef.show(nUser.iconRef.current);
          nUser.hideMenu = () => nUser.menuRef.hide();
          this.users.push(nUser);
        } 
        this.setState({ userList: this.users });     
      })
      
    });  
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
            { this.state.userList.map((item:any, i:any) => (item.id != this.context.state.myId) && (
              
              <View key={item.id} style={(i === (this.users.length - 1)) ? styles.textContainer_last : styles.textContainer}>
                <Text style={styles.listTextLeft}>{item.name}</Text>

                <Icon                
                onPress={() => item.showMenu()}
                name={'chevron-circle-down'}
                size={30} 
                color='#000000'
                />
                <Text style={styles.refOpenMenu} ref={item.iconRef}></Text>
                <Menu ref={item.setMenuRef}> 
                  <MenuItem onPress={() => { this.props.navigation.navigate('Chat', { userChattingId: item.id, userChatting: item.name }); item.hideMenu(); }}>Send message</MenuItem>
                  <MenuItem>Track</MenuItem>
                </Menu>

              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  openButton: {
    flex: 1,
    top: 30,
    right: 30,
    zIndex: 5,
    position: 'absolute',
    backgroundColor: '#F04812' 
  },
  refOpenMenu: {
    position: "absolute",
    right: 15,
    bottom: -10
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