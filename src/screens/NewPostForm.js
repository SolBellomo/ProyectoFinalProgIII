import { NavigationRouteContextComponent } from 'react-native';
import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from "../firebase/config";

class NewPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            showCamera: true,
        }
    }
    
    submitPost(){
        db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),            
            title: this.state.title,
            description: this.state.description,
            likes: [],
            comments: [],
            /* photo: this.state.url, */
        })
        .then( ()=>{
            this.setState({
                title: '',
                description:''
            })
            // redirect
            /* this.props.drawerProps.navigation.navigate('Home') */
        })
        .catch()
    }

    /* onImageUpload(url) {
        this.setState({
            url: url, 
            showCamera: false,
        })
    } */

    render(){
        return(
           /*  this.state.showCamera ? ( < MyCamera /> ) : ( */
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(title)=>this.setState({title: title})}
                    placeholder='Escribe aquí...'
                    keyboardType='default'
                    tiline
                    value={this.state.title}    
                    />
                <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()}>
                    <Text style={styles.textButton}>Guardar</Text>    
                </TouchableOpacity>
            </View>
        )}
    }
    


const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }

})


export default NewPostForm;