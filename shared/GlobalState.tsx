import React from 'react';

export const initialState = {
  isConnected: false,
  myName: '',
  myId: '',
  mySocket: '',
  menu: {
    open: false
  },
  userList: [],
  updateIsConnected: (status:boolean) => {
    return (initialState.isConnected = status);
  },
  updateMyName: (name:string) => {
    return (initialState.myName = name);
  },
  updateMyId: (id:string) => {
    return (initialState.myId = id);
  },
  updateMySocket: (socket:any) => {
    return (initialState.mySocket = socket);
  },
  updateUserList: (list:any) => {
    return (initialState.userList = list);
  },
  toggleMenu: (prop:boolean) => {
    return (initialState.menu.open = prop);
  },

}

export const GlobalState = React.createContext(initialState);