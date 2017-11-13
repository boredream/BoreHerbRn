import React from 'react';
import {AppRegistry} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Home from './pages/Home';
import HerbDetail from './pages/HerbDetail';
import Categories from './pages/Categories';
import Search from './pages/Search';
import LetterHerbs from './pages/LetterHerbs';
import Mine from './pages/Mine';
import Feedback from './pages/Feedback';
import About from './pages/About';

const DrawerApp = DrawerNavigator(
    {
        Home: { screen: Home },
        Categories: { screen: Categories },
        LetterHerbs: { screen: LetterHerbs },
        Feedback: { screen: Feedback },
        About: { screen: About },
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
        Search: { screen: Search },
    },
    { headerMode: 'none' }
);


AppRegistry.registerComponent('BoreHerbRn', () => HomeStack);