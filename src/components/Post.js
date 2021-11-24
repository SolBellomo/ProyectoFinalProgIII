import React, { Component } from 'react'

import { Text, View, TouchableOpacity,  StyleSheet, Image, ActivityIndicator, Modal, FlatList } from 'react-native';
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
            onComment: false,
        }
    }
 componentDidMount(){
     this.reciveLikes();
 }

    reciveLikes(){
        let likes = this.props.postData.data.likes;
        if(likes){
            this.setState({
                likes: likes.length,

            })
        } if (likes.includes(auth.currentUser.email)
        ){
            this.setState({
                myLike: true,
            })
        }
    }
       

    

    
    likePosts(){
        let post = db.collection('posts').doc(this.props.postData.id);
        post.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() =>{
            this.setState({
                likes: this.state.likes +1,
                myLike: true
            })
            console.log('likeado')
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });

    }
    
    unLikePosts(){
        let post = db.collection('posts').doc(this.props.postData.id);
        post.update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(() =>{
            this.setState({
                likes: this.state.likes -1,
                myLike: false
            })
            console.log('deslikeado')
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });

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
                     
                    {!this.state.myLike ?

                    <TouchableOpacity style={styles.likeButton} onPress={()=>this.likePosts()}>
                        <Text style={{color:'black',}}><FontAwesomeIcon icon={faHeart}/></Text>
                        <Text> {this.state.likes} </Text>

                    </TouchableOpacity>:

                    <TouchableOpacity style={styles.likeButton} onPress={()=>this.unLikePosts()}>

                        <Text style={{color:'red',}}><FontAwesomeIcon icon={faHeart}/></Text>
                        <Text> {this.state.likes} </Text>

                    </TouchableOpacity>}

                    <Text style={styles.title}> {this.props.postData.data.title}</Text>
                    <Text style={styles.description}> {this.props.postData.data.description}</Text>

                    <TouchableOpacity style={styles.button} onPress={()=>this.deletePost()}>
                        <Text style={styles.textButton}>
                        Borrar post
                        </Text>    
                    </TouchableOpacity>

                    <Modal visible={false} animationType="slide" transparent={false} style={styles.comentarios}>
                        <Text>Comentarios</Text>

                        <CommentForm postId={this.props.postData.id} />
                            
                        <FlatList 
                            data={this.state.comments}
                            keyExtractor={(com) => com.id}            
                            renderItem = {({item})=> <CommentForm postId={item}/>}
                        />
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

    comentarios: {
        borderColor: 'transparent',
        alignSelf: 'center',
        marginTop: '20%',
    },

    title: {
        fontWeight: 500,
        marginTop: '1%',
        alignSelf: 'flex-start',
    },

    description: {
        alignSelf: 'flex-start',
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
        alignSelf: 'flex-start',
    },

    user: {
        marginBottom: 8,
        alignSelf: "flex-start",
    },

})

export default Post;