import React, {Component} from "react";
import {View, Text, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';

import {db} from '../firebase/config';

import Post from "../Components/Post";

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: false,
            input: ""
        }
    }

    componentDidMount(){
       
    }
    
    search(text){
        db.collection('posts').where('ownerNik','==', this.state.input).get().then(docs => {
            let posts=[];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()

                })
            })
            console.log(posts)
            this.setState({
                posts: posts,
                input: text
            })
        })  
        console.log(text)
    }

    render(){
        return(
          
            <View style={styles.inicioSesion}>

          
    
            <View style={styles.campos}>
                <TextInput style={styles.input}
                  onChangeText={(text) => this.setState({ input : text })}
                  placeholder= "Insertar Usuario"
                  keyboardType="email-address" 
                />
              
                <TouchableOpacity
                  style={styles.button}
                 onPress={()=> this.search()}
                >
                  <Text style={styles.textButton} >Buscar</Text>
                </TouchableOpacity>   
                

                <FlatList 
                data={this.state.posts}
                keyExtractor={(post) => post.id}            
                renderItem = {({item})=> <Post postData={item}/>}
            />
                
            </View>
            
          </View>
        
                  
          )
    }
}

const styles = StyleSheet.create({
    inicioSesion: {
      borderColor: 'grey',
      borderStyle: 'solid',
      borderWidth: 1,
      marginLeft: 50,
      marginTop: 30,
      marginRight: 50,
      borderRadius: 20,
      minHeight: 'auto',
      backgroundColor: 'white',
    },
  
    campos: {
      alignItems: "center", 
      marginBottom: 50,
      padding: 10,
    },
  
    image:{
      height: 300,
      marginTop: 40,
    },
  
    button: {
      backgroundColor: "#405DE6",
      marginHorizontal: 10,
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#fff",
      width: '90%',
      marginTop: 20,
    },
  
    textButton: {
      color: "#fff",
    },
  
    input: {
      marginTop: 5,
      marginBottom: 5,
      borderColor: 'grey',
      borderStyle: 'solid',
      borderWidth: 1,
      width: '90%',
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 4,
    },
  
    regis:{
      marginHorizontal: 10,
      marginTop: 5,
      marginBottom: 5,
    },
  
    registro: {
      color: "#405DE6",
    },
  
  });


export default Search;