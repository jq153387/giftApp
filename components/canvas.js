import React from 'react';
import PropTypes from 'prop-types';
import {
    AppRegistry,
    PanResponder,
    StyleSheet,
    Text,
    View,
    WebView,
    Button,
    TouchableOpacity,
    Dimensions
} from 'react-native';

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        //this.webView = null;
    }
    onMessage(event) {
        const state = this.props.state;
        //console.log(state);

        //const index =
        if (!state) {
            //console.log('On Message', event.nativeEvent.data);

            //console.log(this.props.bgImg);
            //this.setState({ data: 'hello' });
            this.props.setCardFinished(JSON.parse(event.nativeEvent.data));
        }
    }
    renderCanvas(canvas) {
        //const canvas = document.getElementById("can");
        //canvas.style.backgroundImage = "url('" + images + "')";
        //"url('https://static-cdn.123rf.com/images/v5/featured/katiemartynova_39465445.jpg')";
        const ctx = canvas.getContext('2d');
        const w = 300;
        const h = 300;
        canvas.width = w;
        canvas.height = h;
        ctx.fillStyle = 'purple';
        ctx.fillRect(0, 0, 300, 300);
        document.addEventListener(
            'message',
            function(event) {
                const canvas = document.getElementById('can');
                const ctx = canvas.getContext('2d');
                const message = JSON.parse(event.data);
                ctx.globalCompositeOperation = 'destination-out';
                const x = message.x;
                const y = message.y;
                const state = message.state;
                const index = message.index;
                ctx.beginPath();
                ctx.arc(x, y, 10, 0, Math.PI * 2);
                ctx.fill();
                alertInfo(ctx, w, h, state, index);
            },
            false
        );
    }
    alertInfo(ctx, w, h, state, index) {
        var data = ctx.getImageData(0, 0, w, h).data;
        let n = 0;
        //window.postMessage(data);
        // for (var i = 0, n = 0; i < data.length; i += 4) {
        //     if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
        //         n++;
        //     }
        // }
        for (var i = 0; i < data.length; i++) {
            if (data[i] == 0) {
                n++;
            }
        }
        if (n >= data.length * 0.4) {
            //ctx.globalCompositeOperation = 'destination-over';
            ctx.fillRect(0, 0, w, h);
            //ctx.canvas.style.opacity = 0;
            const data = { index: index, state: true };
            window.postMessage(JSON.stringify(data));
        }
    }
    sendPostMessage() {
        //console.log(this.props.postData);
        let message = {};
        if (this.props.postData != undefined) {
            message = {
                message: 'message', // string
                x: this.props.postData.X,
                y: this.props.postData.Y,
                state: this.props.state,
                index: this.props.index
            };
        }
        this.webview != undefined
            ? this.webview.postMessage(JSON.stringify(message))
            : '';
        //;
    }
    componentDidUpdate() {
        this.sendPostMessage();
    }
    render() {
        // var contextString = JSON.stringify(this.props.context);

        const renderString = this.renderCanvas.toString();
        const alertInfo = this.alertInfo.toString();
        const bgImg = this.props.bgImg;
        const html = `<html>
                        <head>
                        <title>canvas</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1">
                        <style>
                            *{
                            margin: 0;
                            padding: 0;
                            }
                        </style>
                        </head>
                        <body>
                        <canvas id='can'>
                            您的browser不支持canvas
                        </canvas>
                        <script>
                            var canvas = document.querySelector('canvas');
                            ${renderString}
                            renderCanvas.call(null,canvas);

                            canvas.style.backgroundImage = "url(${bgImg})";

                            document.querySelector("button").onclick = function() {
                                console.log('hello');
                                
                            }

                            ${alertInfo}
                        </script>
                        </body>
                        </html>`;
        //console.log(html);

        return (
            <View style={this.props.style}>
                {/* <Text>123</Text> */}
                <WebView
                    source={{ html: html }}
                    ref={w => (this.webview = w)}
                    onMessage={event => this.onMessage(event)}
                    //automaticallyAdjustContentInsets={false}
                    //injectJavaScript={this.handleCanvas()}
                    //javaScriptEnabled={true}
                    scalesPageToFit={false}
                    scrollEnabled={false}
                />
            </View>
        );
    }
}
Canvas.propTypes = {
    //context: PropTypes.object,
    //render: PropTypes.func.isRequired,
    bgImg: PropTypes.string.isRequired,
    state: PropTypes.bool,
    index: PropTypes.number,
    postData: PropTypes.object,
    setCardFinished: PropTypes.func.isRequired
};
//AppRegistry.registerComponent("Canvas", () => Canvas);
export default Canvas;
