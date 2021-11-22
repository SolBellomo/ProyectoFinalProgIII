import React, { Component } from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }
  

  navigateToRegister() {
    this.props.screenProps.navigation.navigate('Register')
  }

  navigateToPasswordRecovery(){
    this.props.screenProps.navigation.navigate('PasswordRecovery')
  }
  
  render() {
    return (
      <View style={styles.inicioSesion}>

        <Image style={styles.image} source={require('../../assets/730_generated.jpg')} resizeMode='contain' />

        <View style={styles.campos}>
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder= "email"
              keyboardType="email-address" 
            />
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder="password"
              keyboardType="email-address"
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.login(this.state.email, this.state.password)}
            _>
              <Text style={styles.textButton}>Iniciar Sesión</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={styles.regis} onPress={() => this.props.screenProps.navigation.navigate('Register')}>
              <Text style={styles.registro}>
                  ¿No tenés una cuenta? Registrate
              </Text>
            </TouchableOpacity> 
            <TouchableOpacity style={styles.contra} onPress={() => this.props.screenProps.navigation.navigate('PasswordRecovery')}>
              <Text style={styles.registro}>
                  ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity> 
        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  inicioSesion: {
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 50,
    marginTop: 30,
    marginRight: 50,
    borderRadius: 20,
    minHeight: 'auto',
    backgroundColor: 'white',
  },

  campos: {
    alignItems: "center", 
    marginBottom: 50,
    padding: 10,
  },

  image:{
    height: 300,
    marginTop: 40,
  },

  button: {
    backgroundColor: "#405DE6",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#fff",
    width: 300,
    marginTop: 20,
  },

  textButton: {
    color: "#fff",
  },

  input: {
    marginTop: 5,
    marginBottom: 5,
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    width: 300,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
  },

  regis:{
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  registro: {
    color: "#405DE6",
  },

});


export default Login;
