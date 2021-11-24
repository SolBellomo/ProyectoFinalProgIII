import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { db, auth } from '../firebase/config';
import Post from '../components/Post';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Profile extends Component {

    constructor(props) {
      super(props);
      this.state = {
        posts: [],
      }
    }

  componentDidMount(){
    this.showPost();
  }
  
  showPost(){
    db.collection('posts')
      .where('ownerNik','==', auth.currentUser.displayName)
      .orderBy('createdAt', 'desc')
      .limit(8)
      .onSnapshot((docs) => {
          let posts=[];
          docs.forEach(doc => {
              posts.push({
                  id: doc.id,
                  data: doc.data()

              })
          })
          this.setState({
            posts: posts,
            loading: false
          })
        
      })
  }

      
    render(){
      console.log(auth.currentUser)
      return (
        <View style={styles.container}>

            <Text style={styles.user} ><FontAwesomeIcon icon={faUserCircle} /></Text>
            <Text style={styles.elemt}>{auth.currentUser.displayName}</Text>
         
            <Text style={styles.element}>{auth.currentUser.email}</Text>
            <Text style={styles.element}> Usuario creado el: {auth.currentUser.metadata.creationTime}</Text>
            <Text style={styles.element}> Ultimo login: {auth.currentUser.metadata.lastSignInTime}</Text>
          
            
              
              <Text>Cantidad de posteos: {this.state.posts.length }</Text>
              
              <FlatList 
                data={this.state.posts}
                keyExtractor={(post) => post.id}            
                renderItem = {({item})=> <Post postData={item}/>}
              />
            

            <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
                <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity> 


         </View> 

          )
        }
    }

    const styles= StyleSheet.create({
      user: {
        alignSelf: 'center',
        fontSize: 70,
      },

      elemt:{
        alignSelf: 'center',
        fontSize: 30,
      },

      element: {
        alignSelf: 'center',
      },

      button: {
        backgroundColor: "#405DE6",
        marginHorizontal: 100,
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#fff",
        width: 200,
        marginTop: 20,
      },
    
      textButton: {
        color: "#fff",
      },
    })
  
    export default Profile;