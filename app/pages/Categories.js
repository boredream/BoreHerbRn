import React, {Component} from 'react'
import {View, FlatList, Text, TouchableWithoutFeedback, Image} from 'react-native'
import {VerDivider} from "../component/Divider";
import Header from "../component/Header";
import LocalImg from '../Images'

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            cateHerbs: new Map(),
            selectCategory: '',
            selectCateHerbs: []
        };
    }

    // 组件加载完毕
    componentDidMount() {
        this.setState((state) => ({
            categories: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
            selectCategory: 'A',
        }));
    }

    // 渲染组件
    render() {
        // if(!this.state.herbs) {
        //     return this.renderLoadingView();
        // }

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
                        style={{ }}
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

    changeCategory(item) {
        this.setState((state) => ({
            // 重新拷贝一遍数据，刷新列表
            categories: state.categories.concat(),
            selectCategory: item,
            herbs: require('../../mock/homeData.json')
        }));
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
        return (
            <View style={{ width: 50 }}>
                <Image style={{width: 50, height: 50}}
                    source={} />
                <Text>{item}</Text>
            </View>
        )
    }
}