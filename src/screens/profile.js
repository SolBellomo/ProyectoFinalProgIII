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
      {/*console.log(this.props.user.metadata);*/}
        
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}> {auth.currentUser.email}</Text> 
          <Text style={styles.element}> Email: {this.props.user.email}</Text>
          {/*<Text styles={styles.element}> Usuario creado el: {this.props.user.metadata.creationTime}</Text>
          <Text style={styles.elemt}> Ultimo login: {this.props.user.metadata.lastSingInTime}</Text>*/}
          
              
          <TouchableOpacity style={styles.button} onPress={() => this.props.logout()}>
            <Text style={styles.textButton}>Logout</Text>
          </TouchableOpacity>
         </View> 

          )
        }
    }

    const styles= StyleSheet.create({
      button:{
        backgroundColor: "#fff",
      },
      container:{

      }
    })
  
    export default Profile;