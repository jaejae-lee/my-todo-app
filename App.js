import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
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
        <Text style={ styles.title }>My Tasks</Text>
        <View style={ styles.card }>
          <TextInput style={ styles.input }
                     placeholder={ "New to do" }
                     value={ newToDo }
                     onChangeText={ this.handleNewToDo }
                     placeholderTextColor={ "#999" }
                     returnKeyType={ "done" }
                     autoCorrect={ false }
                     onSubmitEditing={ this.addToDo }
                     underlineColorAndroid={ "transparent" }/>
          <ScrollView contentContainerStyle={ styles.toDos }>
            { Object.values(toDos).reverse().map(toDo => 
                <ToDo key={ toDo.id }
                      deleteToDo={ this.deleteToDo }
                      unDoneToDo={ this.unDoneToDo }
                      doneToDo={ this.doneToDo }
                      updateToDo={ this.updateToDo }
                      { ...toDo } 
                />
            )}
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
  loadToDos = async() => {
    try{
      //this toDos is not an object
      const toDos = await AsyncStorage.getItem("toDos")
      //convert into an object 
      const parsedToDos = JSON.parse(toDos);
      console.log(toDos);
      this.setState({
        //first loading app - todo is null so set as an empty object
        loadedToDos: true, toDos: parsedToDos || {} 
      })
    }catch(err){
      console.log(err)
    }
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
        this.saveToDos(newState.toDos)
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
      this.saveToDos(newState.toDos)
      return {...newState}
    })
  };
  unDoneToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isDone: false
          }
        }
      }
      this.saveToDos(newState.toDos)
      return {...newState}
    })
  };
  doneToDo = (id) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            isDone: true
          }
        }
      }
      this.saveToDos(newState.toDos)
      return {...newState}
    })
  };
  updateToDo = (id, text) => {
    this.setState(prevState => {
      const newState = {
        ...prevState,
        toDos: {
          ...prevState.toDos,
          [id]: {
            ...prevState.toDos[id],
            text: text
          }
        }
      }
      this.saveToDos(newState.toDos)
      return {...newState}
    })
  };
  saveToDos = (newToDos) => {
    //async can't save object - convert into strings
    const saveToDos = AsyncStorage.setItem("toDos", JSON.stringify(newToDos));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8448E',
    alignItems: 'center',
  },
  title:{
    color: "white",
    fontSize: 28,
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
    fontSize: 17,
    padding: 20,
    borderBottomColor: "#bbb",
    borderBottomWidth:1,
  },
  toDos:{
    alignItems: "center",
  }
});
