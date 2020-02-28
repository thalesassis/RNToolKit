/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component } from 'react';
import Routes from './Routes';

const initialState = {
  menu: {
    open: true
  },
  toggleMenu: (prop:boolean) => {
    console.log("toggleMenu");
    return (initialState.menu.open = prop);
  }
}

export const MyContext = React.createContext(initialState);

class App extends Component {
  state = initialState;

  render() {
    return (
      <>
      <MyContext.Provider value={this.state}>
        <Routes />
      </MyContext.Provider>
      </>
    );
  }
};

export default App;
