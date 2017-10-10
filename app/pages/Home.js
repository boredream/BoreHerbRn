import React, {Component} from 'react'
import { View, FlatList, TouchableNativeFeedback, Image} from 'react-native'
import HerbItem from '../component/HerbItem'
import Header from "../component/Header";

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            herbs: null
        };
    }

    // 组件加载完毕
    componentDidMount() {
        this.setState((state) => ({
            herbs: require('../../mock/homeData.json')
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
                    title='首页'
                    isLeftBack={ true }
                    leftImage={'icon_side'} />

                <FlatList
                    data={ this.state.herbs }
                    keyExtractor={(item, index) => index}
                    renderItem={({item})=>{
                        return (
                            <HerbItem
                                herb={ item }
                                navigation={ this.props.navigation }
                            />
                        )
                    }}
                />
            </View>
        )
    }
}