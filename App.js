/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createSwitchNavigator, createAppContainer, createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { reducers } from './src/reducers/index'
import { Tab, Main } from './src/Navigation'

const MainNavigator = createSwitchNavigator(
  {
    Main: Main,
    TabBottom: Tab
  },
  {
    initialRouteName: 'Main'
  }
)

const navReducer = createNavigationReducer(MainNavigator)

const appReducer = combineReducers({
  nav: navReducer,
  ...reducers
})

const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
)

const App = createReduxContainer(MainNavigator);

const mapStateToProps = (state) => ({
  state: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(App);

const store = createStore(
  appReducer,
  applyMiddleware(thunk, middleware)
)

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
        </View>
      </Provider >
    );
  }
}

export default Root