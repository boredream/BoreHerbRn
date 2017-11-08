import React, {Component} from "react";
import {View, Text, Image, ScrollView} from "react-native";
import Header from "../component/Header"
import LocalImg from "../Images"
import NetInfo from "../NetInfo";

export default class HerbDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            herbDetail: null,
        }
    }

    // 组件加载完毕
    componentDidMount() {
        this.fetchData()
    }

    //网络请求
    fetchData() {
        where = '{"name":"' + this.props.navigation.state.params.herb.name + '"}'
        url = NetInfo.url_herb_detail + '?where=' + where
        console.log('url = ' + url)

        fetch(url, {
            headers: NetInfo.header,
        })
            .then((response) => response.json())
            .then((responseData) => {

                this.setState({
                    herbDetail: responseData['results'][0]
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
        const letter = '[' + this.props.navigation.state.params.herb.letter + ']'
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Header
                    leftImage={ LocalImg.icon_back }
                    onLeftClick={() => {
                        this.props.navigation.goBack()
                    }}
                    title={this.props.navigation.state.params.herb.name}/>

                <ScrollView style={{flex:1, paddingLeft: 16, paddingRight: 16}}>

                    <Text style={{fontSize: 14, color: '#333333', marginTop:8}}>
                        { this.props.navigation.state.params.herb.name }
                    </Text>

                    <Text style={{fontSize: 14, color: '#333333', marginTop:2, marginBottom:8}}>
                        { letter }
                    </Text>

                    { this.renderImage() }

                    { this.renderDetail() }

                </ScrollView>
            </View>
        )
    }

    renderImage() {
        if(this.props.navigation.state.params.herb.img) {
            return (
                <Image style={{ height: 160 }}
                       source={{uri: this.props.navigation.state.params.herb.img}}/>
            )
        } else {
            return (
                <View style={{ height: 160, backgroundColor: '#aaaaaa' }} >

                </View>
            )
        }
    }

    renderDetail() {
        if(!this.state.herbDetail) {
            return (
                <View style={{
                    height: 300,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>
                        Loading data ...
                    </Text>
                </View>
            );
        } else {
            return(
                <Text style={{fontSize: 12, color: '#666666', marginTop:8, marginBottom:16}}>
                    { this.state.herbDetail.detail.replace(/(^\s+)|(\s+$)/g,'') }
                </Text>
            )
        }
    }
}
