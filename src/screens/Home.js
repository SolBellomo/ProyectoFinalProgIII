import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, FlatList, StyleSheet} from 'react-native';

import { db } from '../firebase/config';
import Post from '../components/Post'

class Home extends Component {
    constructor() {
      super();
      this.state = {   
        posts: [],
        comments: [],
      }
    }

    componentDidMount() {
      this.showPost();
    }

    showPost() {
      db.collection('posts').onSnapshot((docs) => {
          let posteos = []
          docs.forEach((doc) => {
              posteos.push({
                  id: doc.id,
                  data: doc.data()
              })
          })
          this.setState({
              posts: posteos
          })
      })
    }

    render(){
        return(

          <View style={styles.container}>
            <FlatList 
                data={this.state.posts}
                keyExtractor={(post) => post.id}            
                renderItem = {({item})=> <Post postData={item}/>}
            />
            <FlatList 
                data={this.state.comments}
                keyExtractor={(com) => com.id}            
                renderItem = {({item})=> <CommentForm postId={item}/>}
            />
            </View>
        )            
    }

}
const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'white',
    },

    image:{
        height: 250,
    },

    flatList:{
        justifyContent:'space-between'
    },

    touchable:{
        padding: 4,
        backgroundColor: '#ccc',
        marginBottom: 10,
        borderRadius: 4,
    },

    touchableText:{
        fontWeight: 'bold'
    }
});

export default Home;