import { Camera } from "expo-camera";
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {storage} from '../firebase/config'

class MyCamera extends Component {
    
    constructor(props){
        super(props);
        this.state={
            permission: false,
            photo: '',

            errorMessage: '',
            errorCode: '',
        }
        this.camera; 
    }
    
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then(() => {
                this.setState({
                    permission: true,
                })
            })
    }

    takePicture(){
         this.camera
            .takePictureAsync()
            .then((photo) => {
                console.log(photo);
                this.setState(
                    {
                        photo: photo.uri,
                        showCamera: false, 
                    }
                );
            })

            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMessage: error.message,
                    errorCode: error.code,
                })
            })
    }

    savePicture() {
        //console.log('Guardar foto en firebase')
        fetch(this.state.photo)
        .then((res)=> res.blob()) 
            .then((image)=>{
               const ref = storage.ref(`photos/${Date.now()}.jpg`)
               ref.put(image) 
                    .then(()=>{
                        ref.getDownloadURL()
                            .then((url)=> {this.props.onImageUpload(url)
                            this.setState({
                                photo:"",
                            })
                            });
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

    clearPicture(){
        
    }

    render () {
        return (
            <>
                {this.state.photo ? (
                    <>
                        <View style={styles.camera}>
                            <Image 
                                style={styles.camera}
                                source={{uri: this.state.photo}}
                            />
                        </View>
                        
                        <View>
                            <TouchableOpacity onPress={() => this.savePicture() }>
                                <Text> Aceptar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.clearPicture() }>
                                <Text>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : 
                <>
                < Camera

                    style={{flex:1, width:"100%"}}
                    type={Camera.Constants.Type.front}
                    ref={(cam) => (this.camera = cam) } //acá enlazamos a esta cámara a la referencia de arriba que estaba vacía. Ahora nos vamos a poder referir a la cámara como "cam"
                />
                <TouchableOpacity onPress={() => this.takePicture()} style={styles.button}>
                    <Text style={styles.textButton}> Shoot </Text>
                </TouchableOpacity>
                </>
                }                
            </>
            );            
    }
}

const styles = StyleSheet.create({

    camera: {
        flex: 1, 
        width: "100%",
       
    },

    button: {
        backgroundColor: "#405DE6",
        marginHorizontal: 10,
        alignSelf: "center",
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

});


export default MyCamera;