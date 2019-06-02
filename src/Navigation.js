import React, { Component } from 'react'
import { createAppContainer, createBottomTabNavigator, NavigationAction, createStackNavigator } from 'react-navigation'
import { StyleSheet, View, Text } from 'react-native'
import RegisterContact from './screens/RegisterContact'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Contact from './screens/Contact'
import Icon from 'react-native-vector-icons/FontAwesome'

export const Main = createStackNavigator(
    {
        Home: Home,
        Register: Register,
        RegisterContact: RegisterContact,
        Login: Login,
        Contact: Contact
    },
    {
        initialRouteName: 'Login'
    }
)


const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    color={tintColor}
                    size={24}
                />
            ),
        })
    },
    RegisterContact: {
        screen: RegisterContact,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="user-plus"
                    color={tintColor}
                    size={24}
                />
            ),
        })
    }
}, {
        tabBarOptions: {
            showLabel: false,
            activeTintColor: '#FF4500',
            style: {
                backgroundColor: '#fff'
            }
        }
    })

export const Tab = createStackNavigator({
    TabBottom: TabNavigator
}, {
        defaultNavigationOptions: {
            gesturesEnabled: true,
        },
        header: null,
        headerMode: 'none'
    });