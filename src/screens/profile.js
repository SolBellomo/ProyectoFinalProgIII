import React, { Component } from "react";
import {Text, View} from 'react-native'; 
import { auth } from "../../firebase/config";


class Profile extends Component {

  constructor() {
    super();
    this.setState
}
    render(){
        return (
            
      
       
         <View>
              <Text> {auth.currentUser.email}</Text>
         </View> 

          )
        }
    }
  
    export default Profile;