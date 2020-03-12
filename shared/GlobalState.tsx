import React from 'react';

export const initialState = {
  state: {
    isConnected: false,
    myName: '',
    myId: '',
    mySocket: '',
    menu: {
      open: false
    },
    userList: []
  },
  setState: (prop:any) => {
    return (initialState.state = {...initialState.state, ...prop})
  }
}

export const GlobalState = React.createContext(initialState);