import React, {Component} from "react";
import {FlatList, Image, Text, StyleSheet, View, TextInput, ToastAndroid, TouchableNativeFeedback, TouchableWithoutFeedback, ART} from "react-native";
import {HonDivider} from "../component/Divider";
import LocalImg from "../Images";
import NetInfo from "../NetInfo";
import {commonStyles} from "../styles/Styles"

const {Surface, Shape, Path} = ART;

const path = new Path()
    .moveTo(20,0)
    .arc(0,40,10)
    .arc(0,-40,10)
    .close();

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchKey: '',
            searchStatus: 0,
            searchResult: null,
        }
    }

    search() {
        if(this.state.searchKey.length === 0) {
            ToastAndroid.show('搜索内容不能为空', ToastAndroid.SHORT)
            return
        }

        this.setState({
            searchStatus: 1,
        })
        this.fetchData(1)
    }

    //网络请求
    fetchData(page) {
        where = '{"name":{"$regex":".*'+this.state.searchKey+'.*"}}'

        limit = 20
        skip = (page - 1) * limit

        url = NetInfo.url_herb + '?limit='+limit+"&skip="+skip +"&where="+where
        console.log(url)

        fetch(url, {
            headers: NetInfo.header,
        })
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    searchStatus: 2,
                    searchResult: responseData['results']
                })
            })
            .catch((error) => {
                console.log('error = ' + error)
                this.setState({
                    searchStatus: 3,
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

                <View style={{
                    backgroundColor: 'white',
                    height: 56,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>

                    <TouchableNativeFeedback onPress={() => { this.props.navigation.goBack() }}>
                        <View style={styles.container}>
                            <Image style={commonStyles.icon} source={LocalImg.icon_back}/>
                        </View>
                    </TouchableNativeFeedback>

                    <View style={{width:240, height:32, backgroundColor:'#e5e5e5', flexDirection:'row'}} >

                        <Image style={{width:16, height:16, margin:8}}
                               source={LocalImg.icon_search} />

                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="输入关键词搜索"
                            placeholderTextColor="#999999"
                            onChangeText={(searchKey) => this.setState({searchKey})}
                            value={this.state.searchKey}
                            style={{flex:1, height:32, fontSize: 14, color: '#666666',padding:0 }}/>
                    </View>

                    <TouchableNativeFeedback onPress={() => { this.search() }}>
                        <View style={styles.container}>
                            <Text style={{fontSize: 14, color: '#999999'}}>搜索</Text>
                        </View>
                    </TouchableNativeFeedback>

                </View>

                <HonDivider/>

                { this.renderContent() }

            </View>
        )
    }

    renderContent() {
        if(this.state.searchStatus === 1) {
            return (
                <View style={{
                    backgroundColor: 'white',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text>
                        Loading data ...
                    </Text>
                </View>
            );
        } else if(this.state.searchStatus === 2) {
            return(
                <FlatList
                    data={ this.state.searchResult }
                    keyExtractor={(item, index) => index}
                    renderItem={({item})=>{
                        return this.renderItem(item)
                    }}
                    style={{flex:1, backgroundColor: 'white'}}>

                </FlatList>
            )
        }
    }

    renderItem(item) {
        return(
            <View style={{height:60, paddingLeft:20}}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('HerbDetail', {herb: item})}}>

                    <View style={{flexDirection:'row', flex:1, paddingRight:20, alignItems:'center'}}>
                        { item.img
                            ? <Image
                                style={styles.image}
                                source={{uri: item.img}} />
                            : <View style={styles.image} >
                                <Surface width={40} height={40}>
                                <Shape d={path} fill="#aaaaaa"/>
                                </Surface>
                              </View> }

                        <View style={{marginLeft:20}}>
                            <Text style={styles.text}>{ item.name }</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

                <HonDivider/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width:40,
        height:40,
        borderRadius: 20,
    },
    text: {
        fontSize: 14,
        color: '#333333',
    }
})