import React, {Component} from "react";
import {View, Text, Button} from "react-native";

export default class SearchHerb extends Component {

    static navigationOptions =  ({navigation}) => ({
        title: '搜索',
    });

    render() {
        return (
            <View>
                <Text>Hello, Search!</Text>
            </View>
        );
    }
}
