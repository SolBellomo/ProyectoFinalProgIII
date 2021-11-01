
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {Text, View, TouchableOpacity } from 'react-native'; 
import Menu from "./src/components/Menu"


 function App() {
  return (
    <NavigationContainer>
    <Menu />
    </NavigationContainer>
  );
}

export default App;