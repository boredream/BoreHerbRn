import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'

export default class HerbItem extends Component {

    onItemClick() {
        this.props.navigation.navigate('HerbDetail', {herb: this.props.herb})
    }

    render() {
        return(
            <TouchableNativeFeedback onPress={ this.onItemClick.bind(this) }>
                <View style={{
                    backgroundColor: '#f0f0f0',
                    height: 118,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 14,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
            </TouchableNativeFeedback>
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
