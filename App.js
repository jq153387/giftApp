import React from "react";
import {
    Container,
    Header,
    Title,
    Content,
    Footer,
    FooterTab,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text
} from "native-base";
import AppHeader from "./components/appHeader";
import AppBody from "./components/appBody";
import AppFooter from "./components/appFooter";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
//產生min到max之間的亂數 
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomimg(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    //let img
    switch (num) {
        case 0:
            return "https://static-cdn.123rf.com/images/v5/featured/katiemartynova_39465445.jpg";
        //break;
        case 1:
            return "https://www.homeland.ie/media/image/3f/40/7b/Dog.jpg";
        //break;
        case 2:
            return "https://www.abc.net.au/news/image/7318414-3x2-700x467.jpg";
        //break;
        default:
            return "https://www.abc.net.au/news/image/7318414-3x2-700x467.jpg";
        //break;
    }
}
let gifts = [];
const randnb = getRandom(0, 100);
for (let index = 0; index < 10; index++) {
    if (randnb == index) {
        gifts[index] = {
            point: 0,
            title: "日本來回機票一張",
            state: false,
            images: "https://www.abc.net.au/news/image/7318414-3x2-700x467.jpg"
        };
    } else {
        const randnbs = getRandom(0, 10);
        const randimg = getRandomimg(0, 2);
        gifts[index] = {
            point: randnbs,
            title: randnbs,
            state: false,
            images: randimg
        };
    }
}

const initialState = {
    count: 0,
    coin: 0,
    gifts: gifts,
    location: [
        {
            X: 0,
            Y: 0
        }
    ]
};
//console.log(initialState);

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADDPOINT":
            return {
                ...state,
                coin: action.coin,
                count: state.count + action.coin,
                gifts: [
                    ...state.gifts.slice(0, action.index),
                    {
                        ...state.gifts[action.index],
                        state: true
                    },
                    ...state.gifts.slice(action.index + 1)
                ]
            };
        case "SETLOCATION":
            return {
                ...state,
                location: [
                    ...state.location.slice(0, action.index),
                    {
                        X: action.data.locationX,
                        Y: action.data.locationY
                    },
                    ...state.location.slice(action.index + 1)
                ]
            };
        default:
            return state;
    }
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    counterReducer,
    composeEnhancers(applyMiddleware(thunk))
);

class CounterUI extends React.Component {
    render() {
        return (
            <Container>
                <AppHeader />
                <AppBody />
                <AppFooter />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.count,
        coin: state.coin
    };
};

const CounterContainer = connect(mapStateToProps)(CounterUI);

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }
    componentWillMount() {
        this.loadFonts();
    }
    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
        this.setState({ isReady: true });
    }
    render() {
        if (!this.state.isReady) {
            return <Expo.AppLoading />;
        }
        return (
            <Provider store={store}>
                <CounterContainer />
            </Provider>
        );
    }
}
