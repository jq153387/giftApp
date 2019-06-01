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
    postCoin(index, point, giftstate) {
        console.log(point);
        const body = { point: point, count: point };
        if (!giftstate) {
            this.props.addPoint(point, index);
        }
        //apiGetAll('http://localhost:8000/api/posts2', 'post', body);
    }
    forCard() {
        console.log('hello');
        const gifts = this.props.gifts.map((item, index, array) => {
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
                        <TouchableOpacity
                            style={style.boxview}
                            onPress={() =>
                                this.postCoin(index, item.point, item.state)
                            }
                        >
                            <Text
                                style={
                                    item.state
                                        ? style.boxtextshow
                                        : style.boxtext
                                }
                            >
                                {item.title}
                            </Text>
                        </TouchableOpacity>
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
        return <Content>{this.forCard()}</Content>;
    }
}

const mapStateToProps = state => {
    return {
        count: state.count,
        coin: state.coin,
        gifts: state.gifts
    };
};
const mapDispatchToProps = {
    addPoint(coin, index) {
        return {
            type: 'ADDPOINT',
            coin: coin,
            index: index
        };
    }
};
const { width, height } = Dimensions.get('window');
console.log(width);

const style = StyleSheet.create({
    boxview: {
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: 200
    },
    boxtext: {
        fontSize: 0.2 * width,
        color: 'red',
        display: 'none'
    },
    boxtextshow: {
        fontSize: 0.2 * width,
        color: 'red',
        display: 'flex'
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(appBody);
