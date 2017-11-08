import React, {Component} from 'react'
import { View, SectionList, Text, Image, StyleSheet, ART, TouchableWithoutFeedback } from 'react-native'
import Header from '../component/Header'
import LocalImg from '../Images'
import NetInfo from '../NetInfo'
import {commonStyles} from "../styles/Styles";
import {HonDivider} from "../component/Divider"

const {Surface, Shape, Path} = ART;

const path = new Path()
    .moveTo(20,0)
    .arc(0,40,20)
    .arc(0,-40,20)
    .close();

export default class LetterHerbs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            letterHerbs: null,
        };
    }

    // 组件加载完毕
    componentDidMount() {
        this.fetchData()
    }

    //网络请求
    fetchData() {
        // api限制最多返回500数据
        limit = 600
        skip = 0

        url = NetInfo.url_herb + '/?limit='+limit+"&skip="+skip

        fetch(url, {
            headers: NetInfo.header,
        })
            .then((response) => response.json())
            .then((responseData) => {

                // 按照拼音首字母保存数据集合
                map = new Map()
                results = responseData['results']
                for(const i in results) {
                    herb = results[i]
                    firstLetter = herb.letter.charAt(0).toUpperCase()

                    if(!map.has(firstLetter)) {
                        list = [herb]
                        map.set(firstLetter, list)
                    } else {
                        list = map.get(firstLetter)
                        list.push(herb)
                    }
                }

                sections = []
                for(let i=65; i<91; i++) {
                    letter = String.fromCharCode(i)
                    if(map.has(letter) && map.get(letter).length > 0) {
                        sections.push({
                            key: letter,
                            data: map.get(letter),
                        })
                    }
                }

                this.setState({
                    letterHerbs: sections
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
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>

                <Header
                    title='全部草药'
                    leftImage={ LocalImg.icon_back }
                    onLeftClick={() => {
                        this.props.navigation.goBack()
                    }}/>

                { this.renderContent() }
            </View>
        )
    }

    renderContent() {
        if(!this.state.letterHerbs) {
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
                <SectionList
                    style={{paddingLeft:16, paddingRight:16}}
                    keyExtractor={(item, index) => index}
                    sections={ this.state.letterHerbs }
                    renderItem={({item}) => {
                        return this.renderItem(item)
                    }}
                    renderSectionHeader={({section}) => {
                        return this.renderCateItem(section)
                    }}
                    />
            )
        }
    }

    renderItem(item) {
        return(
            <View>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('HerbDetail', {herb: item})}}>
                    <View style={{ flexDirection:'row', height: 60, alignItems:'center' }}>
                        {this.renderImage(item)}
                        <View style={{width:16}}/>
                        <Text style={commonStyles.subHeader}>{item.name}</Text>
                    </View>
                </TouchableWithoutFeedback>

                <HonDivider/>
            </View>
        )
    }

    renderImage(item) {
        if(item.img) {
            return(
                <Image
                    style={styles.image}
                    source={{uri: item.img}} />
            )
        } else {
            return(
                <View style={styles.image} >
                    <Surface width={40} height={40}>
                        <Shape d={path} fill="#aaaaaa"/>
                    </Surface>
                </View>
            )
        }
    }

    renderCateItem(section) {
        return(
            <View style={{height:32, justifyContent:'space-between'}}>
                <View style={{height: 1}}/>
                <Text style={{fontSize:16, color:'#bb4637'}}>{section.key}</Text>
                <View style={{height: 1, backgroundColor: '#bb4637'}}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        width:40,
        height:40,
        borderRadius: 20,
    }
})
