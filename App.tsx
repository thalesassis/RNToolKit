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
import { initialState, GlobalState } from './shared/GlobalState';

class App extends Component {
  state = initialState;

  render() {
    return (
      <>
      <GlobalState.Provider value={this.state}>
        <Routes />
      </GlobalState.Provider>
      </>
    );
  }
};

export default App;
