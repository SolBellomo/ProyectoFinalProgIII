import React, { Component } from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username:"",
    };
  }



  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/20943587.jpg')} resizeMode='contain' />

        <View style={styles.campos}>
            <TextInput  style={styles.input}
              onChangeText={(text) => this.setState({ username: text })}
              placeholder="Nombre de usuario"
              keyboardType="email-address"
            />
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder="email"
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
              onPress={() => this.props.register(this.state.email, this.state.username, this.state.password )}
            >
              <Text style={styles.textButton}>Registrarse</Text>
            </TouchableOpacity>

            <Text style={styles.errorCode}>{this.props.errorCode}</Text>

        </View>
        
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderStyle: 'solid',
    borderWidth: 1,
    marginLeft: 50,
    marginTop: 30,
    marginRight: 50,
    borderRadius: 20,
    minHeight: 'auto',
  },

  image: {
    height: 300,
    marginTop: 40,
  },

  campos: {
    alignItems: "center", 
    marginBottom: 50,
    padding: 10,
  },

  user: {
    fontSize: 100,
    textAlign: 'center',
    color: '#1b99e5',
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

  recordar: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  record: {
    color: "#405DE6",
  },

  errorCode: {
    color: 'red',
  },
  
});

export default Register;