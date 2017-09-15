import React, { Component } from 'react'
import { View } from 'react-native'

export default class Divider extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{height: 0.5, backgroundColor: '#e5e5e5'}}/>
        )
    }

}
