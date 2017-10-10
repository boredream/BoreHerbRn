import React, { Component } from 'react'
import { View, Text, Image, TouchableNativeFeedback, StyleSheet, ToastAndroid } from 'react-native'
import {commonStyles} from '../styles/Styles'
import LocalImg from '../../app/Images'


export default class Header extends Component {

    static propTypes = {
        leftImage: React.PropTypes.string,
        title: React.PropTypes.string.isRequired,
        rightImage: React.PropTypes.string,
        onLeftClick: React.PropTypes.func,
        onRightClick: React.PropTypes.func,
        isLeftBack: React.PropTypes.bool,
    };

    render() {
        return(
            <View style={{
                backgroundColor: 'white',
                height: 56,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>

                { this.renderLeft() }

                <Text style={commonStyles.subHeader}>{this.props.title}</Text>

                <TouchableNativeFeedback>
                    <View style={styles.container}>
                        <Image style={commonStyles.icon} source={require('../../images/icon_side.png')}/>
                    </View>
                </TouchableNativeFeedback>
            </View>
        )
    }

    renderLeft() {
        if(this.props.isLeftBack) {
            return (
                <TouchableNativeFeedback onPress={() => { ToastAndroid.show('toatttttttttt', ToastAndroid.SHORT) }}>
                    <View style={styles.container}>
                        <Image style={commonStyles.icon} source={LocalImg.icon_back}/>
                    </View>
                </TouchableNativeFeedback>
            )
        } else if(this.props.leftImage) {
            return (
                <TouchableNativeFeedback onPress={()=>{this.props.onLeftClick}}>
                    <View style={styles.container}>
                        <Image style={commonStyles.icon} source={LocalImg[this.props.leftImage]}/>
                    </View>
                </TouchableNativeFeedback>
            )
        } else {
            return(
                <View style={{width:48, height:56}} />
            )
        }
    }

}

const styles = StyleSheet.create({
    container: {
        width: 48,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
})

