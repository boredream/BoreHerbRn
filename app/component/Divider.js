import React, { Component } from 'react'
import { View } from 'react-native'

export class HonDivider extends Component {

    render() {
        return(
            <View style={{height: 0.5, backgroundColor: '#e5e5e5'}}/>
        )
    }

}

export class VerDivider extends Component {

    render() {
        return(
            <View style={{width: 0.5, backgroundColor: '#e5e5e5'}}/>
        )
    }

}
