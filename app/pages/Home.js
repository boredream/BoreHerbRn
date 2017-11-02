import React, {Component} from 'react'
import { View, FlatList } from 'react-native'
import HerbItem from '../component/HerbItem'
import Header from '../component/Header'
import LocalImg from '../Images'

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

    //网络请求
    fetchData() {
        //这个是js的访问网络的方法
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                let data = responseData.items;
                let dataBlob = [];
                let i = 0;
                data.map(function (item) {
                    dataBlob.push({
                        key: i,
                        value: item,
                    })
                    i++;
                });
                this.setState({
                    //复制数据源
                    dataArray: dataBlob,
                    isLoading: false,
                });
                data = null;
                dataBlob = null;
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            })
            .done();
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
                    rightImage={ LocalImg.icon_side }
                    onRightClick={()=>{ this.props.navigation.navigate('DrawerOpen'); }}/>

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