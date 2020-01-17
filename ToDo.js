<script src="http://localhost:8097"></script>

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const { height, width } = Dimensions.get("window")

class ToDo extends Component {
    constructor(props){
        super(props);
        this.state = { 
            isEditing:false, 
            toDoValue: props.text, 
            isDone: this.props.isDone,
            text: this.props.text,
            deleteToDo: this.props.deleteToDo,
            id: this.props.id,
        }
    }
    //why I need these?
    /*
    static propTypes = {
        text: PropTypes.string.isRequired,
        isDone: PropTypes.bool.isRequired,
        deleteToDo: PropTypes.func.isRequired,
        id: PropTypes.string.isRequired,
        unDoneToDo:PropTypes.fuc.isRequired,
        doneToDo:PropTypes.fuc.isRequired,
        updateToDo: PropTypes.fuc.isRequired,
    }*/

    render() { 
        const { isEditing, toDoValue } = this.state;
        const { text, id, deleteToDo, isDone } = this.props;
        // console.log(this.state.text, "text");
        // console.log(id, "id");
        // console.log(deleteToDo, "deleteToDo");
        return ( 
            <View style={ styles.container }>
                <View style={ styles.column }>
                    <TouchableOpacity onPress={ this.toggleDone }>
                        <View style={ [styles.circle,
                                       isDone? styles.circleDone : styles.circleUnDone] }></View>
                    </TouchableOpacity>
                    {/* editing field */}
                    { isEditing? 
                        <TextInput style={ [styles.text, styles.input, isDone? styles.textDone : styles.textUnDone ] }
                                value={ toDoValue } 
                                multiline={ true } 
                                onChangeText={ this.handleInput }
                                returnKeyType={ "done" }
                                onBlur={ this.doneEditing }/> 
                        : <Text style={ [styles.text, isDone? styles.textDone : styles.textUnDone ] }>{ text }</Text>
                    }
                </View>

                    {/* icons */}
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
                        <TouchableOpacity onPressOut={ (event) =>  { event.stopPropagation; deleteToDo(id) } }>
                            <View style={ styles.actionContainer }>
                                <Text style={ styles.actionText }>❌️️</Text>
                            </View>
                        </TouchableOpacity>
                    </View> 
                    }  
            </View>
         );     
    }

    toggleDone = (event) => {
        event.stopPropagation();
        const { isDone, unDoneToDo, doneToDo, id } = this.props;
        if(isDone){
            unDoneToDo(id)
        }else{
            doneToDo(id)
        }
    }
    startEditing = (event) => {
        event.stopPropagation();
        this.setState({
            isEditing: true,
        })
    }
    doneEditing = (event) => {
        event.stopPropagation();
        const { toDoValue } = this.state;
        const { id, updateToDo } = this.props;
        updateToDo(id, toDoValue)
        this.setState({
            isEditing: false,
        })
    }
    handleInput = (text) => {
        this.setState({
            toDoValue: text,
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
        width: 26,
        height: 26,
        borderColor: "red",
        borderWidth: 3,
        borderRadius: 13,
        marginRight: 20,
    },
    circleDone:{
        borderColor: "#bbb"
    },
    circleUnDone:{
        borderColor: "#92FFA0",
    },
    text:{
        fontWeight: "600",
        fontSize: 18,
        marginVertical: 15,
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
        width : width / 2,
    },
    action:{
        flexDirection: "row",
    },
    actionContainer:{
        marginVertical: 10,
        marginHorizontal: 10,
    },
    input:{
        paddingTop: 0,
        width : width / 2,
    }, 
})
