import React, {Component} from "react";
import {View, Text, Button} from "react-native";

export default class HerbDetail extends Component {

    static navigationOptions =  ({navigation}) => ({
        title: 'Bundles',
        headerRight: <Text onPress={ () => { navigation.navigate('Test') } }>Click Me</Text>,
    });

    render() {
        return (
            <View>
                <Text>Hello, Chat App!</Text>

                <Button
                    onPress={() => {
                        this.props.navigation.navigate('Test');
                    }}
                    title="to Test"
                />
            </View>
        );
    }
}
