import React, {Component} from "react";
import {FlatList, Image, Text, TouchableWithoutFeedback, View, TextInput, ToastAndroid} from "react-native";
import {VerDivider} from "../component/Divider";
import Header from "../component/Header";
import LocalImg from "../Images";
import NetInfo from "../NetInfo";

export default class Feedback extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: '',
            contactInfo: ''
        }
    }

    commit() {
        if(this.state.content.length === 0) {
            ToastAndroid.show('反馈内容不能为空', ToastAndroid.SHORT)
            return
        }

        if(this.state.contactInfo.length === 0) {
            ToastAndroid.show('联系方式不能为空', ToastAndroid.SHORT)
            return
        }

        this.fetchData()
    }

    //网络请求
    fetchData() {
        // 这种是multipart格式
        // let formData = new FormData();
        // formData.append("email", "emal!!!");
        // formData.append("content", "content!!!");

        data = {
            'content': this.state.content,
            'email': this.state.contactInfo,
        }

        url = NetInfo.url_feedback
        console.log(url)

        fetch(url, {
            method: 'POST',
            headers: NetInfo.header,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((responseData) => {
                ToastAndroid.show('提交成功！感谢您的宝贵意见！', ToastAndroid.SHORT)
                this.setState({
                    content: '',
                    contactInfo: ''
                })
            })
            .catch((error) => {
                console.log('error = ' + error)
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
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
                    rightText="提交"
                    onRightClick={() => {
                        this.commit()
                    }}
                    title="意见反馈"/>

                <View style={{ flex:1}}>

                    <TextInput
                        multiline={true}
                        underlineColorAndroid="transparent"
                        style={{height: 200, fontSize: 14, color: '#666666', textAlignVertical: 'top',
                                padding: 12, backgroundColor:'white', marginTop: 8, marginBottom: 8}}
                        placeholder="您的意见对我们非常重要，我们会不断优化和改善，努力为您带来更好的体验！"
                        placeholderTextColor="#999999"
                        onChangeText={(content) => this.setState({content})}
                        value={this.state.content}
                        />

                    <TextInput
                        underlineColorAndroid="transparent"
                        style={{fontSize: 14, color: '#666666', padding: 12, backgroundColor:'white'}}
                        placeholder="请输入您的邮箱或者QQ号"
                        placeholderTextColor="#999999"
                        onChangeText={(contactInfo) => this.setState({contactInfo})}
                        value={this.state.contactInfo}
                        />
                </View>

            </View>
        )
    }

}