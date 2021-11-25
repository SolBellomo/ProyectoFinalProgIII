import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import firebase from "firebase";
import { db, auth } from "../firebase/config";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
    };
  }

  onComment() {
    let comment = {
      createdAt: Date.now(),
      author: auth.currentUser.displayName,
      comment: this.state.comments,
    };

    db.collection("posts")
      .doc(this.props.postId)
      .update({
        //llama al posteo de la colección
        comments: firebase.firestore.FieldValue.arrayUnion(comment), //llamo al objeto literal de comment que armé
        //agrega a la lista de comments el nuevo comentario
      })
      .then(() => {
        this.setState({
          comments: "",
        });
      });
  }


  render() {
    return (
      <View style={styles.commentAll}>
        <View style={styles.campos}>
          {this.props.comments.length > 0 ? (
            <FlatList
              data={this.props.comments}
              keyExtractor={(com) => com.id}
              renderItem={({ item }) => (
                <Text style={styles.commentBox}>
                  <Text style={styles.user}>{item.author} </Text>
                  <Text>{item.comment}</Text>
                </Text>
              )}
            />
          ) : (
            <Text>No existen comentarios</Text>
          )}

          <TouchableOpacity onPress={() => this.props.close()}>
            <Text style={styles.verMenos}>Ver menos</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            onChangeText={(text) => this.setState({ comments: text })}
            placeholder="Insertar comentario"
            keyboardType="default"
            value={this.state.comments}
          />

          <TouchableOpacity
            disabled={this.state.comments == "" ? true : false}
            style={styles.button}
            onPress={() => this.onComment()} //ejecuta la función onComment
          >
            <Text style={styles.textButton}>Comentar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    minHeight: "auto",
    backgroundColor: "white",
    minWidth: "90%",
  },

  commentAll: {
    width: '100%',
  },

  campos: {
    alignItems: "center",
    marginBottom: 50,
    padding: 10,
  },

  image: {
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
    width: "50%",
    alignSelf: "flex-end",
  },

  textButton: {
    color: "#fff",
  },

  verMenos: {
    color: 'blue',
  },

  input: {
    marginTop: 5,
    marginBottom: 5,
    borderColor: "grey",
    borderStyle: "solid",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },

  regis: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  registro: {
    color: "#405DE6",
  },
  
  user:{
    fontWeight: 500,
  },

  commentBox:{
    alignSelf: 'flex-start',
  }, 

});

export default CommentForm;
