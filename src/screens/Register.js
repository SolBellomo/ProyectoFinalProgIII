import React, { Component } from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet,} from "react-native";


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
      <View>
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
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    
  },
  textButton: {
    color: "#fff",
  },

  input: {
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  },

});

export default Register;