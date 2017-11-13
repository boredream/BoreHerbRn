import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableNativeFeedback, TouchableOpacity, Image} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Home from './pages/Home';
import HerbDetail from './pages/HerbDetail';
import Categories from './pages/Categories';
import SearchHerb from './pages/SearchHerb';
import LetterHerbs from './pages/LetterHerbs';
import Mine from './pages/Mine';
import Feedback from './pages/Feedback';

const DrawerApp = DrawerNavigator(
    {
        Home: { screen: Home },
        Categories: { screen: Categories },
        LetterHerbs: { screen: LetterHerbs },
        Feedback: { screen: Feedback },
    },{
        drawerWidth: 256,
        drawerPosition:'left',
        contentComponent: Mine
    }
)


const HomeStack = StackNavigator(
    {
        DrawerApp: { screen: DrawerApp },
        HerbDetail: { screen: HerbDetail },
        SearchHerb: { screen: SearchHerb },
    },
    { headerMode: 'none' }
);



AppRegistry.registerComponent('BoreHerbRn', () => HomeStack);