<script src="http://localhost:8097"></script>

import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { AppLoading } from "expo";
import uuidv1 from "uuid/v1";

import ToDo from './ToDo.js';

const { height, width } = Dimensions.get("window");

export default class APP extends Component {

    state = {
      newToDo: "",
      loadedToDos: false,
      toDos: {}
    }

  componentDidMount = () => {
    this.loadToDos();
  }

  render(){
    const { newToDo, loadedToDos, toDos } = this.state;
    console.log(toDos, "toDos");
    if(!loadedToDos){
      return <AppLoading/>
    }
    return (
      <View style={ styles.container }>
        <StatusBar barStyle="light-content"/>
        <Text style={ styles.title }>Jae's Tasks</Text>
        <View style={ styles.card }>
          <TextInput style={ styles.input }
                     placeholder={ "New to do" }
                     value={ newToDo }
                     onChangeText={ this.handleNewToDo }
                     placeholderTextColor={ "#999" }
                     returnKeyType={ "done" }
                     autoCorrect={ false }
                     onSubmitEditing={ this.addToDo }/>
          <ScrollView contentContainerStyle={ styles.toDos }>
            <ToDo/>
            { Object.values(toDos).map(toDo => <ToDo key={ toDo.id } { ...toDo } deleteToDo={ this.deleteToDo }/>) }
          </ScrollView>
        </View>
      </View>
    );
  }

  handleNewToDo = (text) => {
    this.setState({
      newToDo: text
    })
  }
  loadToDos = () => {
    this.setState({
      loadedToDos: true
    })
  }
  addToDo = () => {
    const { newToDo } = this.state;
    if(newToDo !== ""){
      this.setState(preState => {
        const ID = uuidv1();
        const newToDoObj = {
          [ID]:{
            id: [ID],
            isDone: false,
            text: newToDo,
            createdAt: Date.now()
          }
        }
        const newState ={
          ...preState,
          newToDo: "",
          toDos: {
            ...preState.toDos,
            ...newToDoObj
          }
        }
        return { ...newState }
      })
    }
  }
  deleteToDo = (id) => {
    this.setState(prevState => {
      const toDos = prevState.toDos;
      delete toDos[id];
      const newState = {
        ...prevState,
        ...toDos
      }
      return {...newState}
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
    alignItems: 'center',
  },
  title:{
    color: "white",
    fontSize: 30,
    fontWeight: "300",
    marginTop: 50,
    marginBottom: 30,
  },
  card:{
    backgroundColor: "white",
    flex: 1,
    width: width - 25,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    ...Platform.select({
      ios:{
        shadowColor: "rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height: -1,
          width: 0
        }
      },
      android:{
        elevation: 3
      }
    }),
  },
  input:{
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth:1,
  },
  toDos:{
    alignItems: "center",
  }
});
