import React, { Component } from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet, Image} from "react-native";


class RecuperarContraseña extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
    };
  }



  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={require('../../assets/Data_security_28.jpg')} resizeMode='contain' />

        <View style={styles.campos}>
            <TextInput  style={styles.input}
              onChangeText={(text) => this.setState({ username: text })}
              placeholder="Nombre de usuario"
              keyboardType="email-address"
            />
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput style={styles.input}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder="Contraseña"
              keyboardType="email-address"
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.register(this.state.email, this.    state.username, this.state.password )}
            >
              <Text style={styles.textButton}>Cambiar contraseña</Text>
            </TouchableOpacity>
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

  campos: {
    alignItems: "center", 
    marginBottom: 50,
    padding: 10,
    marginTop: 20,
  },

  image: {
    height: 150,
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

});


export default RecuperarContraseña;