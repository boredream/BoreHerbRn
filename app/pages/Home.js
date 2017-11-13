import React, {Component} from 'react'
import { View, FlatList, Text } from 'react-native'
import HerbItem from '../component/HerbItem'
import Header from '../component/Header'
import LocalImg from '../Images'
import NetInfo from '../NetInfo'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            herbs: null
        };
    }

    // 组件加载完毕
    componentDidMount() {
        this.fetchData(1)
    }

    //网络请求
    fetchData(page) {
        limit = 10
        skip = (page - 1) * limit

        url = NetInfo.url_herb + '?limit='+limit+"&skip="+skip
        console.log('url=' + url)

        fetch(url, {
            headers: NetInfo.header,
        })
            .then((response) => response.json())
            .then((responseData) => {
                results = responseData['results']

                this.setState({
                    herbs: results,
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
                    title='首页'
                    leftImage={ LocalImg.icon_side }
                    onLeftClick={() => { this.props.navigation.navigate('DrawerOpen'); }}
                    rightImage={ LocalImg.icon_search }
                    onRightClick={()=>{ this.props.navigation.navigate('Search'); }}/>

                { this.renderContent() }
            </View>
        )
    }

    renderContent() {
        if(!this.state.herbs) {
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
            return(
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
            )
        }
    }
}
