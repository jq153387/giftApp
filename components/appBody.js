import React, { Component } from 'react';
import {
    Image,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Button,
    Icon,
    Left,
    Body,
    Right
} from 'native-base';
import { connect } from 'react-redux';
import Canvas from './canvas';

function apiGetAll(api, method = 'get', body) {
    return fetch(api, {
        headers: { 'content-type': 'application/json' },
        method,
        body: JSON.stringify(body)
    })
        .then(response => response.json().then(json => ({ json, response })))
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }

            return json;
        })
        .then(response => response, error => error);
}
class appBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: [
                {
                    X: 0,
                    Y: 0
                }
            ],
            scrollState: true
        };
    }
    setCardFinished(data) {
        //console.log(point);
        const point = this.props.gifts[data.index].point;
        const giftstate = this.props.gifts[data.index].state;
        //const body = { point: point, count: point };
        if (!giftstate) {
            this.props.addPoint(point, data.index);
        }
        //apiGetAll('http://localhost:8000/api/posts2', 'post', body);
    }
    setCanvasDraw() {
        // let data = []
        // for (let index = 0; index < 5; index++) {
        //     //const element = array[index];
        //     data[index]=
        // }
        const data = this.state.data;

        const canvasdata = data.map((item, index) => {
            return (
                <View
                    key={index}
                    style={styles.container}
                    onStartShouldSetResponder={() => true}
                    onMoveShouldSetResponder={() => true}
                    // onResponderGrant={evt => {
                    //     this.setState({ index: 0 });
                    // }}
                    onResponderMove={evt => {
                        //this.setState({ move: evt });
                        //console.log('pageX:' + evt.nativeEvent.pageX);
                        const data = {
                            locationX: evt.nativeEvent.locationX,
                            locationY: evt.nativeEvent.locationY
                        };
                        this.sendPostMessage(data, index);
                    }}
                >
                    <Canvas
                        key={index}
                        // context={context}
                        // render={renderCanvas}
                        setCardFinished={data => this.setCardFinished(data)}
                        postData={this.state.location[index]}
                        state={item.state}
                        bgImg={item.images}
                        index={index}
                        style={{ height: 400, width: 300 }}
                    />
                </View>
            );
        });
        return canvasdata;
    }
    sendPostMessage(data, index) {
        //this.props.setLocation(data, index);
        this.setState({
            location: [
                ...this.state.location.slice(0, index),
                {
                    X: data.locationX,
                    Y: data.locationY
                },
                ...this.state.location.slice(index + 1)
            ],
            scrollState: false
        });
    }
    forCard() {
        //console.log('hello');
        const gifts = this.props.gifts.map((item, index, array) => {
            //console.log(item.images);

            return (
                <Card key={index}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: 'Image URL' }} />
                            <Body>
                                <Text>獎品{index}</Text>
                                <Text note>禮物or點數</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem cardBody>
                        <View
                            key={index}
                            style={styles.container}
                            onStartShouldSetResponder={() => true}
                            onMoveShouldSetResponder={() => true}
                            onResponderGrant={evt => {
                                //this.setState({ index: 0 });
                            }}
                            onResponderMove={evt => {
                                //this.setState({ move: evt });
                                //console.log('pageX:' + evt.nativeEvent.pageX);
                                const data = {
                                    locationX: evt.nativeEvent.locationX,
                                    locationY: evt.nativeEvent.locationY
                                };
                                this.sendPostMessage(data, index);
                            }}
                            onResponderRelease={evt => {
                                //const index = this.state.index;
                                this.setState({ scrollState: true });
                            }}
                        >
                            <Canvas
                                key={index}
                                // context={context}
                                // render={renderCanvas}
                                setCardFinished={data =>
                                    this.setCardFinished(data)
                                }
                                postData={this.state.location[index]}
                                state={item.state}
                                bgImg={item.images}
                                index={index}
                                style={{ height: 300, width: 300 }}
                            />
                        </View>
                        {/* {<Image
                            source={{ uri: 'Image URL' }}
                            style={{ height: 200, width: null, flex: 1 }}
                        />} */}
                    </CardItem>
                    {/* {<CardItem>
                        <Left>
                            <Button transparent>
                                <Icon active name='thumbs-up' />
                                <Text>Likes</Text>
                            </Button>
                        </Left>
                        <Body>
                            <Button transparent>
                                <Icon active name='chatbubbles' />
                                <Text>4 Comments</Text>
                            </Button>
                        </Body>
                        <Right>
                            <Text>11h ago</Text>
                        </Right>
                    </CardItem>} */}
                </Card>
            );
        });
        return gifts;
    }
    render() {
        const scrollState = this.state.scrollState;
        return <Content scrollEnabled={scrollState}>{this.forCard()}</Content>;
    }
}

const mapStateToProps = state => {
    return {
        count: state.count,
        coin: state.coin,
        gifts: state.gifts,
        location: state.location
    };
};
const mapDispatchToProps = {
    addPoint(coin, index) {
        return {
            type: 'ADDPOINT',
            coin: coin,
            index: index
        };
    },
    setLocation(data, index) {
        return {
            type: 'SETLOCATION',
            data: data,
            index: index
        };
    }
};
const { width, height } = Dimensions.get('window');
//console.log(width);

const styles = StyleSheet.create({
    container: {
        width: 300,
        height: 300
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(appBody);
