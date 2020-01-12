import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get("window")
class ToDo extends Component {
    state = { 
        isEditing: false,
        isDone: false,
     }

    render() { 
        const { isDone, isEditing } = this.state;
        return ( 
            <View style={ styles.container }>
                <View style={ styles.column }>
                    <TouchableOpacity onPress={ this.toggleDone }>
                        <View style={ [styles.circle,
                                    isDone? styles.circleDone : styles.circleUnDone] }></View>
                    </TouchableOpacity>
                    <Text style={ [styles.text, isDone? styles.textDone :styles.textUnDone] }>Hello Im todo</Text>
                </View>

                    { isEditing? 
                        <View style={ styles.action }>
                            <TouchableOpacity onPressOut={ this.doneEditing }>
                                <View style={ styles.actionContainer }>
                                    <Text style={ styles.actionText }>✅</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    : <View style={ styles.action }>
                        <TouchableOpacity onPressOut={ this.startEditing }>
                            <View style={ styles.actionContainer }>
                                <Text style={ styles.actionText }>✏️</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={ styles.actionContainer }>
                                <Text style={ styles.actionText }>❌️️</Text>
                            </View>
                        </TouchableOpacity>
                    </View> 
                    }   
            </View>
         );     
    }

    toggleDone = () => {
        this.setState({
            isDone: !this.state.isDone
        })
    }

    startEditing = () => {
        this.setState({
            isEditing: true,
        })
    }
    doneEditing = () => {
        this.setState({
            isEditing: false,
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
        alignItems: "center",
        justifyContent: "space-between",
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
    },
    textDone:{
        color: "#bbb",
        textDecorationLine: "line-through",
    },
    textUnDone:{
        color: "#353535",
    },
    column:{
        flexDirection: "row",
        alignItems: "center",
        width : width /2,
        justifyContent: "space-between",
    },
    action:{
        flexDirection: "row",
    },
    actionContainer:{
        marginVertical: 10,
        marginHorizontal: 10,
    }


})
