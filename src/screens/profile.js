import React, { Component } from "react";
import {Text, View, TouchableOpacity, StyleSheet, Touchable} from 'react-native'; 
import { auth,db } from "../firebase/config";


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
               
              <Text> Email: {auth.currentUser.email}</Text>
              {/* <Text> Usuario creado el: {db.currentUser.creationTime}</Text>
              <Text> Ultimo login: {db.currentUser.lastSingInTime}</Text>  */}
              
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