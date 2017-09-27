import React, {Component} from "react";
import {View, Text, Button} from "react-native";

export default class HerbDetail extends Component {

    static navigationOptions =  ({navigation}) => ({
        title: 'HerbDetail',
    });

    render() {
        return (
            <View>
                <Text>Hello, HerbDetail!</Text>
            </View>
        );
    }
}
