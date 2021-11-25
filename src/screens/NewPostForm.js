import React, { Component } from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { auth, db } from '../firebase/config';

import MyCamera from '../screens/MyCamera';



class NewPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            showCamera: true,
            url: '',
        }
    }
    
    submitPost(){
        db.collection('posts').add({ 
            owner: auth.currentUser.email,
            ownerNik: auth.currentUser.displayName,
            createdAt: Date.now(), 
            title: this.state.title,
            description: this.state.description,
            likes: [],
            comments: [],
            photo: this.state.url,
        })
        .then( ()=>{
            this.setState({
                title: '',
                description:''
            })
            // redirect
            this.props.screenProps.navigation.navigate('Home') 
        })
        .catch() 
    }

    onImageUpload(url) {
        this.setState({
            url: url, 
            showCamera: false,
        })
    } 


    render(){
        return(
            
            this.state.showCamera ? ( < MyCamera onImageUpload={(url) => this.onImageUpload(url)}/> ) : (
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={(title)=>this.setState({title: title})}
                    placeholder='Título'
                    keyboardType='default'
                    value={this.state.title}    
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text)=>this.setState({description: text})}
                    placeholder='Descripción'
                    keyboardType='default'
                    multiline={true}
                    value={this.state.description}    
                />
                <TouchableOpacity style={styles.button} onPress={()=>this.submitPost()} >
                    <Text style={styles.textButton}>
                        Postear
                    </Text>    
                </TouchableOpacity>
            </View>
        ))}
    }
    


const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },

    input:{
        height: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },

    button:{
        backgroundColor:'#405DE6',
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