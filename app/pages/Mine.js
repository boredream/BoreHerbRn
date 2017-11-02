import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {HonDivider} from "../component/Divider";

export default class Mine extends Component {

    render() {
        return (
            <View style={{flex:1, paddingLeft:24, paddingRight:24, justifyContent: 'space-between'}}>
                <View style={{paddingTop:64}}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate('Categories');
                    }}>
                        <View><Text style={styles.item}>分类</Text></View>
                    </TouchableWithoutFeedback>
                    <HonDivider/>
                    <Text style={styles.item}>我的下载</Text>
                    <HonDivider/>
                    <Text style={styles.item}>设置</Text>
                </View>

                <View style={{marginBottom: 32}}>
                    <Text style={styles.item}>意见反馈</Text>
                    <HonDivider/>
                    <Text style={styles.item}>关于</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        height: 60,
        fontSize: 16,
        color: '#333333',
        textAlignVertical: 'center',
    },
})