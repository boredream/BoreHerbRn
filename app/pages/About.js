import React, {Component} from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import {VerDivider} from "../component/Divider";
import Header from "../component/Header";
import LocalImg from "../Images";

export default class About extends Component {

    constructor(props) {
        super(props);
    }

    // 渲染组件
    render() {
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>

                <Header
                    leftImage={ LocalImg.icon_back }
                    onLeftClick={() => {
                        this.props.navigation.goBack()
                    }}
                    title="关于"/>

                <View style={{ flex:1, padding: 16}}>
                    <Text style={{fontSize: 14, color:'#666666'}}>
                        项目基于React Native。{'\n'}{'\n'}
                        数据来源于《本草纲目》
                    </Text>
                </View>

            </View>
        )
    }

}