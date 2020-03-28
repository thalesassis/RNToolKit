import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Text, Button, TextInput, Alert, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AppMenu from '../shared/AppMenu';
import { connectSocket } from '../services/socket';
import { GlobalState } from '../shared/GlobalState';

export default class Chat extends Component {

  static contextType = GlobalState;

  state = {
    message: "",
    userChatting: "",
    userChattingId: "",
    messages: []
  };

  socket:any;

  constructor(props:any) { 
    super(props);
  }

  sendMessage() {
    let message:any = {toId: this.state.userChattingId, fromId: this.context.state.myId, fromName: this.context.state.myName, message: this.state.message, read: false };
    this.context.state.mySocket.emit("messageTo",message);
    this.setState({message:''});
  } 

  refreshMessages() {

  }

  componentDidMount() {
    console.log(this.context.state.myId);
    this.setState({ messages: this.context.state.messages }); 

    let context = this;
    connectSocket(context, () => { 
      console.log("connected");
      
      this.context.state.mySocket.off("newMessage");

      this.context.state.mySocket.on("newMessage", (msg:any) => {
        console.log("nova msg emitida");
        this.setState(this.context.setState(
        { 
          messages: [...this.context.state.messages, msg]
        }
        )); 
             
      })

    });  

    this.setState({ userChatting: this.props.route.params.userChatting, userChattingId: this.props.route.params.userChattingId });

    console.log(this.context.state.messages);
  }
  
  handleMessage(text:string) {
    this.setState({message: text});
  }

  render() { 
    return (
      <>
      <View style={styles.MainContainer}>
        <AppMenu nav={this.props.navigation}></AppMenu>

        <View style={styles.chattingWith}>
          <Text>Chatting with {this.state.userChatting}</Text>
        </View>

        <ScrollView ref="scrollView" style={styles.scroller}
          onContentSizeChange={(width,height) => this.refs.scrollView.scrollTo({y:height})}
        >
        { this.state.messages.map((item:any, i:any) => (
          <View key={item.fromId+"_"+item.toId+"_"+i} style={ item.fromId == this.context.state.myId ? styles.myBalloon : styles.balloon}>
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
            returnKeyType="done"
            onSubmitEditing={() => {
              this.sendMessage();
            }}
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

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  scroller: {
    position: 'absolute',
    top: 30,
    bottom: 105,
    left: 10,
    right: 10,
    borderRadius: 4,
  },
  balloon: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#CFCFCF',
    marginBottom: 10
  },
  myBalloon: {
    padding: 5,
    borderRadius: 8,
    backgroundColor: '#daffba',
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
  },
  chattingWith: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 7,
    paddingBottom: 15,
  }
});