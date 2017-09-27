import React, {Component} from 'react';
import {AppRegistry, Text, View, TouchableNativeFeedback, TouchableOpacity, Image} from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import Home from './pages/home';
import HerbDetail from './pages/herbDetail';
import SearchHerb from './pages/searchHerb';
import Mine from './pages/mine';
import {commonStyles} from './styles/styles'

const App = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            headerTitle: '首页',
            headerTitleStyle: {
                alignSelf: 'center',
                fontSize: 16,
            },
            headerLeft:
                <TouchableNativeFeedback onPress={() => {navigation.navigate('DrawerOpen')}}>
                    <View style={commonStyles.iconContainer}>
                        <Image style={ commonStyles.icon } source={require('../images/icon_side.png')} />
                    </View>
                </TouchableNativeFeedback>,
            headerRight:
                <TouchableNativeFeedback onPress={ ()=> {navigation.navigate('HerbDetail') }}>
                    <View style={commonStyles.iconContainer}>
                        <Image style={ commonStyles.icon } source={require('../images/icon_search.png')} />
                    </View>
                </TouchableNativeFeedback >,
            drawerLabel: 'SearchHerb',
        }),
    },
    HerbDetail: {
        screen: HerbDetail
    },
    SearchHerb: { screen: SearchHerb },
});

class DrawerContainer extends Component {

    render() {
        return(
            <App/>
        )
    }
}

const DrawerApp = DrawerNavigator(
    {
        DrawerContainer: { screen: DrawerContainer },
    },{
        drawerWidth: 256,
        drawerPosition:'left',
        contentComponent: Mine
    })

AppRegistry.registerComponent('BoreHerbRn', () => DrawerApp);