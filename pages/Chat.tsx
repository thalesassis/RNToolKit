import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, TextInput, Alert, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMenu from '../shared/AppMenu';
import { socket } from '../services/socket';
import { GlobalState } from '../shared/GlobalState';

export default class Chat extends Component {

  state = {
    message: "",
    userChatting: "",
    userChattingId: "",
    messages: [{
      fromId: "",
      toId: "",
      fromName: "Thales",
      message: "Olá"
    },
    {
      fromId: "",
      toId: "",
      fromName: "Thales",
      message: "Olá"
    }]
  };

  socket:any;

  constructor(props:any) { 
    super(props);
  }

  sendMessage() {
    let message:any = {to: this.state.userChattingId, from: this.context.myId, message: this.state.message };
    this.context.mySocket.emit("messageTo",message);
    this.setState({message:''});
  }

  refreshMessages() {

  }

  componentDidMount() {
    this.setState({ userChatting: this.props.route.params.userChatting, userChattingId: this.props.route.params.userChattingId });
  }
  
  handleMessage(text:string) {
    this.setState({message: text});
  }

  render() { 
    return (
      <>
      <View style={styles.MainContainer}>
        <AppMenu nav={this.props.navigation}></AppMenu>

        <View>
          <Text>Chatting with {this.state.userChatting}</Text>
          </View>

        <ScrollView style={styles.scroller}>
        { this.state.messages.map((item:any, i:any) => (
          <View key={item.id} style={styles.balloon}>
            <Text>{item.fromName}</Text>
            <Text>{item.message}</Text>
          </View>
          ))
        }
        </ScrollView>

        <View style={styles.messageFieldBottom}>
          <TextInput
            style={styles.textInput}
            placeholder="Message"
            onChangeText={text => this.handleMessage(text)}
            value={this.state.message}
          />

          <Button 
            title="Send message" 
            onPress={() => { 
              this.sendMessage()
            }}
          />
        </View>

      </View>
      </>
    );
  }
}

Chat.contextType = GlobalState;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  scroller: {
    position: 'absolute',
    top: 30,
    bottom: 40,
    left: 10,
    right: 10
  },
  balloon: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#CFCFCF',
    marginBottom: 10
  },
  textInput: {
    padding: 10,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginBottom: 10,
  },
  messageFieldBottom: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15
  }
});