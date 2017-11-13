import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableNativeFeedback, View} from "react-native";
import {commonStyles} from "../styles/Styles";
import LocalImg from "../../app/Images";
import {HonDivider} from "../component/Divider"

const ImageSourcePropType = require('ImageSourcePropType');

export default class Header extends Component {

    static propTypes = {
        leftImage: ImageSourcePropType,
        title: React.PropTypes.string.isRequired,
        rightImage: ImageSourcePropType,
        rightText: React.PropTypes.string,
        onLeftClick: React.PropTypes.func,
        onRightClick: React.PropTypes.func,
    };

    render() {
        return(
            <View >
                <View style={{
                    backgroundColor: 'white',
                    height: 56,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>

                    { this.renderLeft() }

                    <Text style={commonStyles.subHeader}>{this.props.title}</Text>

                    { this.renderRight() }

                </View>

                <HonDivider/>
            </View>
        )
    }

    renderLeft() {
        if(this.props.leftImage) {
            return (
                <TouchableNativeFeedback onPress={ this.props.onLeftClick }>
                    <View style={styles.container}>
                        <Image style={commonStyles.icon} source={this.props.leftImage}/>
                    </View>
                </TouchableNativeFeedback>
            )
        } else {
            return(
                <View style={{width:48, height:56}} />
            )
        }
    }

    renderRight() {
        if(this.props.rightImage) {
            return (
                <TouchableNativeFeedback onPress={ this.props.onRightClick }>
                    <View style={styles.container}>
                        <Image style={commonStyles.icon} source={this.props.rightImage}/>
                    </View>
                </TouchableNativeFeedback>
            )
        } else if(this.props.rightText) {
            return (
                <TouchableNativeFeedback onPress={ this.props.onRightClick }>
                    <View style={styles.container}>
                        <Text style={{fontSize: 14, color: '#999999'}}>{this.props.rightText}</Text>
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

