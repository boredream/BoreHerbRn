import React, {Component} from 'react'
import {AppRegistry, StyleSheet, View, Text, Image, ListView} from 'react-native'
import Divider from './app/component/Divider'
import HerbItem from './app/component/HerbItem'

export default class Launcher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged:(row1, row2) => row1 !== row2
            })
        };
    }

    // 组件加载完毕
    componentDidMount() {
        let herbs = require('./mock/homeData.json');
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(herbs)
        })
    }

    // 渲染组件
    render() {
        // if(!this.state.herbs) {
        //     return this.renderLoadingView();
        // }

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{
                    height: 44,
                    paddingLeft: 20,
                    paddingRight: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Image
                        style={ styles.icon }
                        source={require('./images/icon_side.png')}
                    />

                    <Text style={{
                        fontSize: 16,
                        color: '#333333'
                    }}>
                        首页
                    </Text>

                    <Image
                        style={ styles.icon }
                        source={require('./images/icon_search.png')}
                    />
                </View>

                <Divider/>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) =>
                        <HerbItem
                            herb={ rowData }
                        />
                    }
                    style={styles.listView}
                    />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    subHeader: {
        fontSize: 16,
        color: '#333333'
    },

    caption: {
        fontSize: 12,
        color: '#666666'
    },

    icon: {
        width: 14,
        height: 14
    }
})

AppRegistry.registerComponent('BoreHerbRn', () => Launcher);