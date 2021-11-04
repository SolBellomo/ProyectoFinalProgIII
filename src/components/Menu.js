import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import Profile from '../screens/profile';
import { auth, db } from "../../firebase/config";


const Drawer = createDrawerNavigator();

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            user:'',
            
        }
    }
   
    register(email, password) {
        auth.createUserWithEmailAndPassword(email, password)
          .then((response) => {
              console.log(response);
              console.log('logged');
              this.setState({
                  logged: true,
                  user: response.user
              })
          })
                                    
          .catch((err) => 
          console.log(err));
          errorMessage: error.message
      }

   
      login(email, password) {
    auth
    .signInWithEmailAndPassword(email, password)
    .then(() => this.setState({ logged: true }))
                            
    .catch((err) => console.log(err));
    }

    logout(){
        auth.signOut()
        .then( (res)=>{
            this.setState({
                user:'',
                logged: false,
            })
        })
    }

    

    render() {
        return (
            <>
                {this.state.logged ? (
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Home'}} name="Home" component={()=><Home user={this.state.user}/>} />
                    <Drawer.Screen options={{title: 'Mi Perfil'}} name="Mi Perfil" component={()=><Profile user={this.state.user} logout={ () => this.logout()} />} />
                </Drawer.Navigator>
                
                ) : ( 
                <Drawer.Navigator>
                     <Drawer.Screen options={{title: 'Login'}} name="Login" component={()=><Login login={(email,pass)=>this.login(email,pass)}/>} />
                    <Drawer.Screen options={{title: 'Register'}} name="Register" component={()=><Register register={(email,pass)=>this.register(email,pass)} />} />
                    <Drawer.Screen options={{title: 'Home' }} name="Home" component={()=><Profile  />}/>
                </Drawer.Navigator>
                )}
            </>
        );
    }
}

const styles = StyleSheet.create({})

export default Menu;
