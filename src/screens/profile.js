import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config'

class Profile extends Component {

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render(){
      console.log(auth.currentUser)
      return (
        <View style={styles.container}>
         
         
          <Text style={styles.element}> Email: {auth.currentUser.email}</Text>
          <Text style={styles.elemt}> Nombre de usuario: {auth.currentUser.displayName}</Text>
         <Text styles={styles.element}> Usuario creado el: {auth.currentUser.metadata.creationTime}</Text>
          <Text style={styles.elemt}> Ultimo login: {auth.currentUser.metadata.lastSignInTime}</Text>
          
              
          <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>
         </View> 

          )
        }
    }

    const styles= StyleSheet.create({
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