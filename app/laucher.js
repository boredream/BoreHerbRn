import React from 'react';
import {AppRegistry, TouchableOpacity, View, TouchableNativeFeedback, Image} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Home from './pages/home';
import HerbDetail from './pages/herbDetail';
import SearchHerb from './pages/searchHerb';
import {commonStyles} from './styles/styles'

const App = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            headerTitle: '首页',
            headerTitleStyle: {
                alignSelf: 'center'
            },
            headerLeft:
                <TouchableNativeFeedback>
                    <View style={commonStyles.iconContainer}>
                        <Image style={ commonStyles.icon } source={require('../images/icon_side.png')} />
                    </View>
                </TouchableNativeFeedback>,
            headerRight:
                <TouchableNativeFeedback onPress={ ()=> {navigation.navigate('SearchHerb') }}>
                    <View style={commonStyles.iconContainer}>
                        <Image style={ commonStyles.icon } source={require('../images/icon_search.png')} />
                    </View>
                </TouchableNativeFeedback >,
        }),
    },
    HerbDetail: {
        screen: HerbDetail
    },
    SearchHerb: { screen: SearchHerb },
});

AppRegistry.registerComponent('BoreHerbRn', () => App);