import React, {Component} from "react";
import {AppRegistry, View} from "react-native";
import { StackNavigator } from "react-navigation";
import Home from "./pages/home";
import HerbDetail from "./pages/herbDetail";

const App = StackNavigator({
    Home: { screen: Home },
    HerbDetail: { screen: HerbDetail },
});

AppRegistry.registerComponent('BoreHerbRn', () => App);