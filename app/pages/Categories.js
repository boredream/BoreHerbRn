import React, {Component} from "react";
import {FlatList, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {VerDivider} from "../component/Divider";
import Header from "../component/Header";
import LocalImg from "../Images";
import NetInfo from "../NetInfo";

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: ['草部', '谷部', '菜部', '果部', '水部', '火部', '土部', '金石部', '木部', '服器部', '虫部', '鳞部', '介部', '禽部', '兽部', '人部'],
            selectCategory: '草部',
            cateHerbs: new Map(),
            selectCateHerbs: []
        };
    }

    // 组件加载完毕
    componentDidMount() {
        this.fetchData(this.state.selectCategory, 1)
    }

    changeCategory(item) {
        this.setState((state) => ({
            // 重新拷贝一遍数据，刷新列表
            categories: state.categories.concat(),
            selectCategory: item,
        }));

        if(this.state.cateHerbs.has(item)) {
            // 如果已经加载过这个类型，则直接显示
            this.setState({
                selectCateHerbs: this.state.cateHerbs.get(item),
            });
        } else {
            // 如果没有加载过这个类型，网络获取
            this.fetchData(item, 1)
        }
    }

    //网络请求
    fetchData(item, page) {
        where = '{"type":"' + item + '"}'

        limit = 18
        skip = (page - 1) * limit

        url = NetInfo.url_herb + '/?limit='+limit+"&skip="+skip+"&where="+where
        console.log(url)

        fetch(url, {
            headers: NetInfo.header,
        })
            .then((response) => response.json())
            .then((responseData) => {
                results = responseData['results']

                this.setState({
                    selectCateHerbs: results,
                });
                this.state.cateHerbs.set(item, results)
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
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Header
                    leftImage={ LocalImg.icon_back }
                    onLeftClick={() => {
                        this.props.navigation.goBack()
                    }}
                    rightImage={ LocalImg.icon_search }
                    onRightClick={() => {
                    }}
                    title="分类"/>

                <View style={{ flex:1, flexDirection: 'row'}}>

                    <View style={{width: 82, paddingTop: 10}} >
                        <FlatList
                            data={ this.state.categories }
                            keyExtractor={(item, index) => index}
                            renderItem={({item}) => {
                                return this.renderCateItem(item)
                            }}
                        />
                    </View>

                    <VerDivider/>

                    <FlatList
                        style={{ paddingLeft:8, paddingRight:8}}
                        numColumns={3}
                        data={ this.state.selectCateHerbs }
                        keyExtractor={(item, index) => index}
                        renderItem={({item}) => {
                            return this.renderGridHerbItem(item)
                        }}
                    />

                </View>

            </View>
        )
    }

    renderCateItem(item) {
        if(this.state.selectCategory === item) {
            return (
                <View style={{ height: 40, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{height:10, width: 2, backgroundColor: '#bb4637', marginLeft: 10, marginRight: 8}}/>
                    <Text style={{fontSize:16, color: '#bb4637'}}>{ item }</Text>
                </View>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={()=>{ this.changeCategory(item) }}>
                    <View style={{ height: 40, flexDirection: 'row', alignItems: 'center'}}>
                        <View style={{height:10, width: 2, marginLeft: 10, marginRight: 8}}/>
                        <Text style={{fontSize:13, color: '#333333'}}>{ item }</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }

    renderGridHerbItem(item) {
        if(item.img) {
            return (
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('HerbDetail', {herb: item})}}>
                    <View style={{ width:87, paddingTop: 18}}>
                        <Image style={{ width: 50, height: 50, alignSelf:'center'}}
                               source={{uri: item.img}}/>
                        <Text style={{fontSize:10, color:'#666666', alignSelf:'center', marginTop: 6}}>{ item.name }</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        } else {
            return (
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('HerbDetail', {herb: item})}}>
                    <View style={{ width:87, paddingTop: 18 }}>
                        <View style={{ width: 50, height: 50, alignSelf:'center', backgroundColor:'#aaaaaa'}} />
                        <Text style={{fontSize:10, color:'#666666', alignSelf:'center', marginTop: 6}}>{ item.name }</Text>
                    </View>
                </TouchableWithoutFeedback>
            )
        }
    }
}