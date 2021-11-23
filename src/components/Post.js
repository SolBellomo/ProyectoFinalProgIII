import React, { Component } from 'react'

import { Text, View, TouchableOpacity,  StyleSheet, Image, ActivityIndicator, Modal} from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';
import CommentForm from '../components/CommentForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {} from '@fortawesome/free-brands-svg-icons';
import { faHeart, faUserCircle } from '@fortawesome/free-solid-svg-icons';


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            likes: 0,
            myLike: false,
        }
    }
 componentDidMount(){
     if(this.props.postData.data.likes){
         this.setState({
             likes: this.props.postData.data.likes.length,
             myLike: this.props.postData.data.owner == auth.currentUser.email,
         })
    }else{
        this.setState({
            likes: this.props.postData.data.likes.length,
            myLike: false
        })
    }
 }

    likePosts(){
        /* let post = db.collection("posteos").doc(this.props.postData.id) */
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                myLike: true,
                likes: this.props.postData.data.likes.length,
                
            })
        })
    }

    unlikePosts(){

        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                myLike: false,
                likes: this.props.postData.data.likes.length,
                
            })
        })
    }

    deletePost(){
        db.collection('posts').doc(this.props.postData.id).delete().then(() => {
            console.log("Document successfully deleted!");
        })
    }


    render(){
        console.log(this.props.postData) 
        return(
             
                <View style={styles.container}>
                 
                    
                    <Text style={styles.user} ><FontAwesomeIcon icon={faUserCircle} /> {this.props.postData.data.ownerNik}</Text>
                    
                    <Image 
                        style={{flex: 1, width: 300, height:250}}
                        source={{uri: this.props.postData.data.photo}}
                    />

                    <Text style={styles.title}> {this.props.postData.data.title}</Text>
                    <Text style={styles.description}> {this.props.postData.data.description}</Text>
                     
                    {!this.state.myLike ?

                    <TouchableOpacity style={styles.likeButton} onPress={()=>this.likePosts()}>
                        <Text style={{color:'black',}}><FontAwesomeIcon icon={faHeart}/></Text>
                        <Text style={styles.likes}>{this.state.likes} </Text>

                    </TouchableOpacity>:
                    <TouchableOpacity style={styles.likeButton} onPress={()=>this.unlikePosts()}>

                        <Text style={{color:'red',}}><FontAwesomeIcon icon={faHeart}/></Text>
                        <Text style={styles.likes}>{this.state.likes} </Text>

                    </TouchableOpacity>}

                    <TouchableOpacity style={styles.button} onPress={()=>this.deletePost()}>
                        <Text style={styles.textButton}>
                        Borrar post
                        </Text>    
                    </TouchableOpacity>
                    <Modal visible={false} animationType="slide" transparent={false}>
                        
                    <CommentForm postId={this.props.postData.id} />
                        
                     </Modal>
                   
                    

                </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        borderColor: '#DCDCDC',
        borderWidth: 2,
        borderStyle: 'solid',
        padding: 50,
        flex: 2,
        display: 'flex',
        marginBottom: 10,
        borderRadius: 12,
    },

    title: {
        fontWeight: 500,
        marginTop: 10,
    },

    button: {
        backgroundColor:'#405DE6',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#fff',
        marginTop: 10,
    },

    textButton: {
        color: '#fff',
    },

    likeButton: {
        flex: 1,
        marginTop: 10,
        flexWrap: "wrap",
    },

    user: {
        marginBottom: 8,
        alignSelf: "flex-start",
    },

})

export default Post;
