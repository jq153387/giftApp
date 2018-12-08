import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppHeader from "./components/appHeader";
import AppBody from "./components/appBody";
import AppFooter from "./components/appFooter";

export default class App extends React.Component {
    render() {
        return (
            <View>
                <AppHeader />
                <AppBody />
                <AppFooter />
            </View>
        );
    }
}
