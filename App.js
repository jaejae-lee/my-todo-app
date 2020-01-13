<script src="http://localhost:8097"></script> 

import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import { AppLoading } from "expo";

import ToDo from './ToDo.js';

const { height, width } = Dimensions.get("window");

export default class APP extends Component {
  state={
    newToDo: "",
    loadedToDos: false,
  }
  componentDidMount = () => {
    this.loadToDos();
  }
  render(){
    const { newToDo, loadedToDos } = this.state;
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
                     onChange={ this.handleNewToDo }
                     placeholderTextColor={ "#999" }
                     returnKeyType={ "done" }
                     autoCorrect={ false } />
          <ScrollView contentContainerStyle={ styles.toDos }>
            <ToDo text={"Hello Im todo"}/>
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
