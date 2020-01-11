import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get("window")
class ToDo extends Component {
    state = { 
        isEditing: false,
        isDone: false,
     }

    render() { 
        const { isDone } = this.state;
        return ( 
            <View style={ styles.container }>
                <TouchableOpacity onPress={ this.toggleDone }>
                    <View style={ [styles.circle,
                                  isDone? styles.circleDone : styles.circleUnDone] }></View>
                </TouchableOpacity>
                <Text style={ styles.text }>Hello Im todo </Text>
            </View>
         );
    }

    toggleDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }
}

export default ToDo;

const styles = StyleSheet.create({
    container:{
        width: width - 50,
        borderBottomColor: "#bbb",
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center"
    },
    circle:{
        width: 30,
        height: 30,
        borderColor: "red",
        borderWidth: 3,
        borderRadius: 15,
        marginRight: 20,
    },
    circleDone:{
        borderColor: "#bbb"
    },
    circleUnDone:{
        borderColor: "green",
    },
    text:{
        fontWeight: "600",
        fontSize: 20,
        marginVertical: 20,
    }
})
