import React, {Component} from "react";
import {View, Text, Button} from "react-native";

export default class HerbDetail extends Component {

    static navigationOptions =  ({navigation}) => ({
        headerTitle: `${navigation.state.params.herb.name}`,
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 16,
        }
    });

    render() {
        return (
            <View>
                <Text>Hello, HerbDetail!</Text>
            </View>
        );
    }
}
