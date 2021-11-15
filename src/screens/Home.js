import React, { Component } from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator, Image} from 'react-native';
import { db } from '../firebase/config';
import Post from '../components/Post'

class Home extends Component {
    constructor() {
      super();
      this.state = {   
        posts: []
      }
    }

    componentDidMount() {
      this.showPost();
    }

    showPost() {
      db.collection('posteos').onSnapshot((docs) => {
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
            /*recorrer el array de post con flatlist*/
            <FlatList 
                data={this.state.posts}
                keyExtractor={(post) => post.id}            />
            </View>
        )            
    }

}
const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 10,
    },
    image:{
        height:250,
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