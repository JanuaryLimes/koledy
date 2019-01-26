/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Detail from './src/detail';
import Main from './src/main';

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: Main
    },
    Details: {
      screen: Detail
    }
  },
  {
    initialRouteName: 'Main'
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <AppContainer />;
  }
}
