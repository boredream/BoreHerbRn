import React, { Component } from 'react'
import { View, Text, Image, StyleSheet, TouchableNativeFeedback, ART } from 'react-native'
import {commonStyles} from "../styles/Styles";

const {Surface, Shape, Path} = ART;

const path = new Path()
    .moveTo(40,0)
    .arc(0,80,20)
    .arc(0,-80,20)
    .close();

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
                        <Text style={ commonStyles.subHeader }>
                            { this.props.herb.name }
                        </Text>

                        <Text style={ commonStyles.caption }>
                            { this.props.herb.letter }
                        </Text>
                    </View>

                    { this.renderImage() }
                </View>
            </TouchableNativeFeedback>
        )
    }

    renderImage() {
        if(this.props.herb.img) {
            return(
                <Image
                    style={styles.image}
                    source={{uri: this.props.herb.img}} />
            )
        } else {
            return(
                <View style={styles.image} >
                    <Surface width={80} height={80}>
                        <Shape d={path} fill="white"/>
                    </Surface>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    image: {
        width:80,
        height:80,
        borderRadius: 40,
    }
})
