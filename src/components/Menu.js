import React, { Component } from 'react';
import {View, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { auth, db } from "../firebase/config";

import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import Profile from '../screens/profile';
import NewPostForm from '../screens/NewPostForm';
import PasswordRecovery from '../screens/PasswordRecovery'


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
    

    register(email, userName, pass) {
        auth.createUserWithEmailAndPassword(email, pass)
            .then( res => {
                res.user.updateProfile({
                    displayName: userName
                })
            })
            .then(() => console.log('Usuario registrado exitosamente!'))
            .catch(err => {
                this.setState({registerError: err})
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
                    <Drawer.Screen options={{title: 'Register'}} name="Register" component={()=><Register register={(email,pass,username)=>this.register(email,pass,username)} />} />
                    <Drawer.Screen options={{title: 'Recuperar Contraseña'}} name='PasswordRecovery' component={() => <PasswordRecovery recuperarContraseña={(email, pass) => this.PasswordRecovery(email, pass)} /> } />
                </Drawer.Navigator>
                )
            }
            </>
        )}
}

const styles = StyleSheet.create({})

export default Menu;