import React, { Component } from "react";
import {Text, View, TextInput, TouchableOpacity, StyleSheet,} from "react-native";


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

  
  render() {
    return (
      <View>
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
        <TouchableOpacity style={styles.regis} onPress={() => this.props.screenProps.navigation.navigate('Register')}>
          <Text>
              ¿No tenés una cuenta? Registrate
          </Text>
        </TouchableOpacity> 
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.login(this.state.email, this.state.password)}
        >
          <Text style={styles.textButton}>Iniciar Sesión</Text>
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

  regis:{
    marginHorizontal: 10,
    marginTop: 5,
    marginBottom: 5,
  }

});


export default Login;
