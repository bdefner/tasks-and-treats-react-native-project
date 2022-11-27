import { Tester, TestHookStore } from 'cavy';
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import AppSpec from './specs/AppSpec';

const testHookStore = new TestHookStore();

class AppWrapper extends Component {
  render() {
    return (
      <Tester specs={[AppSpec]} store={testHookStore}>
        <App />
      </Tester>
    );
  }
}

AppRegistry.registerComponent('Tasks-and-Treats', () => AppWrapper);
