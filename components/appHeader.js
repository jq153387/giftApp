import React, { Component } from 'react';
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
} from 'native-base';
import { connect } from 'react-redux';

class appHeader extends Component {
    render() {
        return (
            <Header>
                <Left>
                    <Button transparent>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>UPresent</Title>
                </Body>
                <Right>
                    {/* {<Icon type='FontAwesome' name='sheqel' />} */}
                    <Text style={{ fontSize: 25, color: 'red' }}>
                        {this.props.count}
                    </Text>
                </Right>
            </Header>
        );
    }
}
mapStateToProps = state => {
    return {
        count: state.count
    };
};
export default connect(mapStateToProps)(appHeader);
