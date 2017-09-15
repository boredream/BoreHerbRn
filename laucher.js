import React, { Component } from 'react'
import { AppRegistry, Text } from 'react-native'

export default class Launcher extends Component {
    render() {
        return(
            <View style={{height:56}}>
                <Text style={{fontsize:22}}>
                    首页
                </Text>
            </View>
        )
    }
}

AppRegistry.registerComponent('BoreHerbRn', () => Launcher);