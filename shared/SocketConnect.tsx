import React, { Component } from 'react';
import { connect, disconnect } from '../services/socket';
import { useGlobalState } from './GlobalState';


export default function connectSocket()  {
  console.log("conectando");
  const [state, dispatch] = useGlobalState();
  
  if(state.myId == '') { disconnect(); }
  
  if(state.myName != "" && state.isConnected == false) {
    connect(state.myName, 
      (userList:any) => {     
        React.setState({isConnected: state.updateIsConnected(true)}); 
        setState({userList: state.updateUserList(userList)}); 
    }, (userId:any, socket:any) => {
        setState({myId: state.updateMyId(userId.id)});           
        setState({mySocket: state.updateMySocket(socket)}); 
    }) 
  } 
  
}