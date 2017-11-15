import React, {Component} from 'react'
import {View, FlatList, Text, RefreshControl} from 'react-native'
import HerbItem from '../component/HerbItem'
import Header from '../component/Header'
import LocalImg from '../Images'
import NetInfo from '../NetInfo'
import codePush from 'react-native-code-push'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            herbs: null,
            refreshing: false,
        };
    }

    // 组件加载完毕
    componentDidMount() {
        codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE });
        this.fetchData()
    }

    //网络请求
    fetchData() {
        // 首页只取8条
        limit = 8
        skip = 0

        url = NetInfo.url_herb + '?limit=' + limit + "&skip=" + skip
        console.log('url=' + url)

        fetch(url, {
            headers: NetInfo.header,
        })
            .then((response) => response.json())
            .then((responseData) => {
                results = responseData['results']

                this.setState({
                    herbs: results,
                    refreshing: false,
                });
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
                    title='草药通'
                    leftImage={ LocalImg.icon_side }
                    onLeftClick={() => {
                        this.props.navigation.navigate('DrawerOpen');
                    }}
                    rightImage={ LocalImg.icon_search }
                    onRightClick={() => {
                        this.props.navigation.navigate('Search');
                    }}/>

                { this.renderContent() }
            </View>
        )
    }

    renderContent() {
        if (!this.state.herbs) {
            return (
                <View style={{
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
        } else {
            return (
                <FlatList
                    data={ this.state.herbs }
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) => {
                        return (
                            <HerbItem
                                herb={ item }
                                navigation={ this.props.navigation }
                            />
                        )
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({
                                    refreshing: true
                                })
                                this.fetchData()
                            }}
                            colors={["#628a25"]}
                        />
                    }
                />
            )
        }
    }
}
