import React, {Component} from 'react'
import { View, FlatList, Text} from 'react-native'
import {VerDivider} from "../component/Divider";

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    // 组件加载完毕
    componentDidMount() {
        this.setState((state) => ({
            categories: ['解表', '清热', '化痰'],
        }));
    }

    // 渲染组件
    render() {
        // if(!this.state.herbs) {
        //     return this.renderLoadingView();
        // }

        return (
            <View style={{flex: 1, backgroundColor: 'white', flexDirection:'row'}}>
                <FlatList
                    style={{width: 82, backgroundColor: 'red'}}
                    data={ this.state.categories }
                    keyExtractor={(item, index) => index}
                    renderItem={({item})=>{
                        return (
                            <Text>Item</Text>
                        )
                    }}
                />

                <VerDivider/>

                <FlatList
                    style={{backgroundColor: 'green'}}
                    data={ this.state.categories }
                    keyExtractor={(item, index) => index}
                    renderItem={({item})=>{
                        return (
                            <Text>Item</Text>
                        )
                    }}
                />

            </View>
        )
    }
}