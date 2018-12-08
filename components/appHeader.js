import React, { Component } from "react";
import {
    Container,
    Header,
    Title,
    Button,
    Left,
    Right,
    Body,
    Icon
} from "native-base";

export default class appHeader extends Component {
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name="arrow-up" />
                    </Button>
                </Left>
                <Body>
                    <Title>Header</Title>
                </Body>
                <Right />
            </Header>
        );
    }
}
