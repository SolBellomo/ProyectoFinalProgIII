import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { auth } from '../firebase/config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

class Profile extends Component {

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    
  misFotos(){
  db.collection('posts')
      .where('username','==', currentUser)
      .orderBy('createdAt', 'desc')
      .limit(8)
      .onSnapshot(

     docs => {
          let posts=[];
          docs.forEach(doc => {
              posts.push({
                  id: doc.id,
                  data: doc.data()

              })
          })
          this.setState({
            posteos: posts,
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
          
            
            
               {/* <Image 
                style={{flex: 1, width: 300, height:250}}
                source={{uri: this.props.postData.data.photo}}
              />
 
               <Text style={styles.title}> {auth.currentUser.props.postData.data.title}</Text>
              <Text style={styles.description}> {this.props.postData.data.description}</Text>

              
            <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
              <Text style={styles.textButton}>Logout</Text>
            </TouchableOpacity> */}
            
            <FlatList 
                data={this.state.posts}
                keyExtractor={(post) => post.id}            
                renderItem = {({item})=> <Post postData={item}/>}
            />
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