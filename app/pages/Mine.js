import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {HonDivider} from "../component/Divider";

export default class Mine extends Component {

    render() {
        return (
            <View style={{flex:1, paddingLeft:24, paddingRight:24, justifyContent: 'space-between'}}>
                <View style={{paddingTop:64}}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate('Categories', {navigation: this.props.navigation});
                    }}>
                        <View><Text style={styles.item}>按 [ 部 ] 分类</Text></View>
                    </TouchableWithoutFeedback>
                    <HonDivider/>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate('LetterHerbs', {navigation: this.props.navigation});
                    }}>
                        <View><Text style={styles.item}>按 [ A-Z ] 排列</Text></View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.item}> </Text>
                </View>

                <View style={{marginBottom: 32}}>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate('Feedback', {navigation: this.props.navigation});
                    }}>
                        <View><Text style={styles.item}>意见反馈</Text></View>
                    </TouchableWithoutFeedback>
                    <HonDivider/>
                    <TouchableWithoutFeedback onPress={()=>{
                        this.props.navigation.navigate('About', {navigation: this.props.navigation});
                    }}>
                        <View><Text style={styles.item}>关于</Text></View>
                    </TouchableWithoutFeedback>
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