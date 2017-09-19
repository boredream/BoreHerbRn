import React, {Component} from "react";
import {AppRegistry, View} from "react-native";
import { StackNavigator } from "react-navigation";
import Home from "./pages/home";
import HerbDetail from "./pages/herbDetail";
import Test from "./pages/test";

const App = StackNavigator({
    HerbDetail: { screen: HerbDetail },
    Home: { screen: Home },
    Test: { screen: Test },
});

AppRegistry.registerComponent('BoreHerbRn', () => App);