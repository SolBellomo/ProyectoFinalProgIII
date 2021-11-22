import React, { Component } from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import firebase from 'firebase';
import { db, auth } from '../firebase/config';


class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: '',
    
    };
  }
  
  onComment(){

    let comment = {
        createdAt: Date.now(),
        author: auth.currentUser.email,
        comment: this.state.comments, 
    }

    db.collection('posts').doc(this.props.postId).update({ //llama al posteo de la colección 
        comments: firebase.firestore.FieldValue.arrayUnion(comment), //llamo al objeto literal de comment que armé
        //agrega a la lista de comments el nuevo comentario
    })
    .then(() => {
        this.setState({
            comments: '',
        });
    });

  }

  /*deleteComment(){
    db.collection('posts').doc(this.props.postid).update({

    })
  }*/
  
  render() {
    return (
      <View style={styles.inicioSesion}>

        <View style={styles.campos}>
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({ comments: text })}
              placeholder= "Insertar comentario"
              keyboardType="default" 
            />
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.onComment()} //ejecuta la función onComment
            _>
              <Text style={styles.textButton}>Comentar</Text>
            </TouchableOpacity>   

        </View>
        
      </View>
    );
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


export default CommentForm;
