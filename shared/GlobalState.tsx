import React from 'react';

export const initialState = {
  isConnected: false,
  menu: {
    open: false
  },
  userList: [],
  updateIsConnected: (status:boolean) => {
    return (initialState.isConnected = status);
  },
  updateUserList: (list:any) => {
    return (initialState.userList = list);
  },
  toggleMenu: (prop:boolean) => {
    return (initialState.menu.open = prop);
  },

}

export const GlobalState = React.createContext(initialState);