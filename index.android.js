import React from 'react';
import {
    AppRegistry,
    Text,
    View,
    Button
} from 'react-native';
import {
    StackNavigator,
    NavigationActions,
} from 'react-navigation';

class ProfileScreen extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.name,
    });
    render() {
        const { goBack } = this.props.navigation;
        return (
            <Button
                title="Go back"
                onPress={() => goBack()}
            />
        );
    }
}

class MainScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome',
    };

    _toMain = () => {
        const resetActions = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Profile'})]
        });
        this.props.navigation.dispatch(resetActions);
    };

    render() {
        return (
            <Button title="登录" onPress={this._toMain}/>
        );
    }
}

const App = StackNavigator({
    Main: {screen: MainScreen},
    Profile: {screen: ProfileScreen},
}, {
    initialRouteName: 'Main',
    navigationOptions: {
        headerTintColor: '#51c4fe',
        headerStyle: {backgroundColor: "white"},
        headerTitleStyle: {alignSelf: 'center'},
    },
});

// if you are using create-react-native-app you don't need this line
AppRegistry.registerComponent('BoreHerbRn', () => App);