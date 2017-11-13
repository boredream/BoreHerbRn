import React, {Component} from 'react'
import { View, SectionList, Text, Image, StyleSheet, ART, TouchableWithoutFeedback, PanResponder } from 'react-native'
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

const letterHeight = 15
const headerHeight = 32
const itemHeight = 60

export default class LetterHerbs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            letterHerbs: null, // 显示用
            letterIndexMap: new Map(), // 定位用
            letterOffsetIndex: [], // 计算offset用的字母索引
        };
    }

    // 组件加载完毕
    componentDidMount() {
        this._panGesture = PanResponder.create({
            //要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                this.onLetterChanged(gestureState.y0)
            },
            onPanResponderMove: (evt, gestureState) => {
                this.onLetterChanged(gestureState.moveY)
            },
            onResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                // console.log('抬手 x:' + gestureState.moveX + ',y:' + gestureState.moveY);
            },
            onPanResponderTerminate: (evt, gestureState) => {
                // console.log(`结束 = evt.identifier = ${evt.identifier} gestureState = ${gestureState}`);
            },
        });

        this.fetchData()
    }

    onLetterChanged(y) {
        let diffY = y - 56
        position = parseInt(diffY / letterHeight)
        if(position < 0) position = 0
        if(position > 25) position = 25
        letter = String.fromCharCode(position + 65)
        letterIndex = this.state.letterIndexMap.get(letter)

        if(typeof(letterIndex) !== "undefined"){
            this.refs.secList.scrollToLocation({itemIndex:0, sectionIndex:letterIndex})
        }
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
                index = 0
                indexInTotal = 1
                for(let i=65; i<91; i++) {
                    letter = String.fromCharCode(i)
                    if(map.has(letter) && map.get(letter).length > 0) {
                        this.state.letterOffsetIndex.push(indexInTotal)
                        
                        this.state.letterIndexMap.set(letter, index++)

                        // 比较迷，为什么header的额外占位是 2 呢~
                        indexInTotal += (map.get(letter).length + 2)

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
            let letters = []
            for(let i=65; i<91; i++) {
                letters.push(String.fromCharCode(i))
            }

            return(
                <View style={{flexDirection:'row'}}>
                    <SectionList
                        ref='secList'
                        style={{flex:1, paddingLeft:16, paddingRight:16}}
                        keyExtractor={(item, index) => index}
                        sections={ this.state.letterHerbs }
                        getItemLayout={(data, index) => this.handleItemLayout(data, index)}
                        renderItem={({item}) => {
                            return this.renderItem(item)
                        }}
                        renderSectionHeader={({section}) => {
                            return this.renderSectionHeader(section)
                        }}
                        />

                    <View
                        style={{width:20, alignItems:'center'}}
                        { ...this._panGesture.panHandlers} >
                        { letters.map((letter) => this.renderLetters(letter)) }
                    </View>
                </View>
            )
        }
    }

    renderLetters(letter) {
        let index = 2

        return (
            <TouchableWithoutFeedback
                key={letter}
                onPressIn={() => {
                    this.scrollTo(index)
                }}>
                <View
                    style={{height:letterHeight, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:12, color:'#666666'}}>{letter}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderSectionHeader(section) {
        return(
            <View style={{height:headerHeight, justifyContent:'space-between'}}>
                <View style={{height: 1}}/>
                <Text style={{fontSize:16, color:'#bb4637'}}>{section.key}</Text>
                <View style={{height: 1, backgroundColor: '#bb4637'}}/>
            </View>
        )
    }

    renderItem(item) {
        return(
            <View style={{height: itemHeight}}>
                <TouchableWithoutFeedback onPress={() => {this.props.navigation.navigate('HerbDetail', {herb: item})}}>
                    <View style={{ flex:1, flexDirection:'row', alignItems:'center' }}>
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

    handleItemLayout(data, index) {
        // offset 是当前item的偏移量，scroll时候用
        let headerCount = 0
        for(let i=0; i<=index; i++) {
            if(this.isInList(this.state.letterOffsetIndex, i)) {
                headerCount ++
            }
        }

        if(headerCount > 0) headerCount --
        const offset = headerCount * headerHeight + (index - 1 - headerCount*2) * 60
        return {length: 60, offset: offset, index}
    }
    
    isInList(list, item) {
        for(let i in list) {
            if(list[i] === item) {
                return true
            }
        }
        return false
    }
    
}

const styles = StyleSheet.create({
    image: {
        width:40,
        height:40,
        borderRadius: 20,
    }
})
