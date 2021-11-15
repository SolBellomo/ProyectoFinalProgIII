import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth, db } from "../firebase/config";

import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import Profile from '../screens/profile';
import NewPostForm from '../screens/NewPostForm';


const Drawer = createDrawerNavigator();

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            user: '',
            errorMessage: '',
            errorCode: '',
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            console.log(user);
            if(user !== null){
                this.setState({
                    logged: true,
                    
                }) 
            } else {
                this.setState({
                    logged: false, 
                    
                
            })
          }
        })
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
                                    
          .catch((err) => {
            console.log(err);
            this.setState({
                errorMessage: error.message,
                errorCode: error.code,
            })
        })
    }

    login(email, password) {
        auth
        .signInWithEmailAndPassword(email, password)
        .then((response) => {
            console.log('logueado')
            console.log('response')
            this.setState({
                logged: true,
                user: response.user,
            })
        })
                            
        .catch((err) => {
            console.log(err);
            this.setState({
                errorMessage: error.message,
                errorCode: error.code,
            })
        })
    }

    logout(){
        auth.signOut()
        .then(()=>{
            this.setState({
                user:'',
                logged: false,
            })
        })
    }

    render() {
        return (
            /*
            <>
                {this.state.logged ? (
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Login'}} name="Login" component={(screenProps)=><Login screenProps={screenProps} login={(email,pass)=>this.login(email,pass)}/>} />
                    <Drawer.Screen options={{title: 'Register'}} name="Register" component={()=><Register register={(email,pass)=>this.register(email,pass)} />} />

                </Drawer.Navigator>
                
                ) : ( 
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Home'}} name="Home" component={()=><Home user={this.state.user}/>} />
                    
                    <Drawer.Screen name="Nuevo Post" component={(screenProps) => <NewPostForm screenProps={screenProps}/> } />

                    <Drawer.Screen options={{title: 'Mi Perfil'}} name="Mi Perfil" component={()=><Profile user={this.state.user} logout={ () => this.logout()} />} />
                </Drawer.Navigator>
                )}
                
            </>
            */
            <>
                {this.state.logged ? (
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Home'}} name="Home" component={()=><Home user={this.state.user}/>} />
                    <Drawer.Screen options={{title: 'Nuevo Post'}} name="Nuevo Post" component={()=> <NewPostForm/> }/>
                    <Drawer.Screen options={{title: 'Mi Perfil'}} name="Mi Perfil" component={()=><Profile user={this.state.user} logout={ () => this.logout()} />} />
                </Drawer.Navigator>
                
                ) : ( 
                <Drawer.Navigator>
                    <Drawer.Screen options={{title: 'Login'}} name="Login" component={(screenProps)=><Login screenProps={screenProps} login={(email,pass)=>this.login(email,pass)}/>} />
                    <Drawer.Screen name="Nuevo Post" component={(screenProps) => <NewPostForm screenProps={screenProps}/> } />
                    <Drawer.Screen options={{title: 'Register'}} name="Register" component={()=><Register register={(email,pass)=>this.register(email,pass)} />} />
                </Drawer.Navigator>
                )
            }
            </>
        )}
}

const styles = StyleSheet.create({})

export default Menu;