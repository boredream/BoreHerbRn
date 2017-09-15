import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default class HerbItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <View style={{
                height: 118,
                backgroundColor: '#f0f0f0',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: 10,
                marginRight: 10,
                marginTop: 14,
                paddingLeft: 42,
                paddingRight: 42
            }}>

                <View style={{
                    justifyContent: 'center'
                }}>
                    <Text style={ styles.subHeader }>
                        { this.props.herb.name }
                    </Text>
                    <Text style={ styles.caption }>
                        { this.props.herb.pinyin }
                    </Text>
                </View>

                <Image
                    style={{
                        width:80,
                        height:80,
                        borderRadius: 40
                    }}
                    source={{uri: this.props.herb.image}} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    subHeader: {
        fontSize: 16,
        color: '#333333'
    },

    caption: {
        fontSize: 12,
        color: '#666666'
    }
})
