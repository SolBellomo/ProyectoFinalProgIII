import React, { Component } from "react";
import {Text, View, TouchableOpacity, StyleSheet, Touchable} from 'react-native'; 
import { auth } from "../firebase/config";


class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
}
    render(){
      console.log(this.props.logout);
        return (
       
         <View>
              {/* <Text> {auth.currentUser.email}</Text> 
              <Text> Email: {this.props.user.email}</Text>
              <Text> Usuario creado el: {this.props.user.metadata.creationTime}</Text>
              <Text> Ultimo login: {this.props.user.metadata.lastSingInTime}</Text>
              */}
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
      }
    })
  
    export default Profile;