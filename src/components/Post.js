import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import firebase from 'firebase'
/* import { FontAwsomeIcon} from '@fontawsome/react-native-fontawsome'
import {faHeart as farHeart} from '@fontawsome/free-regular-svg-icons'
import {faHeart as farHeart} from '@fontawsome/free-regular-solid-svg-icons' */
import { db, auth } from '../firebase/config'

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
             likes: this.props.postData.likes.legth,
             myLike: this.props.postData.data.likes.inculdes(auth.currentUser.email),
         })
    }else{
        this.setState({
            likes: this.props.postData.data.likes.legth,
            myLike: false
        })
    }
 }
    /* receiveLikes() {
        let likes = this.props.postData.data.Likes;
            if(likes){
                this.setState({
                    likes: Likes.Length,
            })
        }
        if(Likes.includes(auth.currentUser.email)){
            this.setState({
                liked:true
            })
        }
    }
 */    /*  */

    likePosts(){
        /* let post = db.collection("posteos").doc(this.props.postData.id) */
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FioldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes: this.postData.data.likes.legth,
                myLike: true
            })
        })
    }


    


    unlikePosts(){
        /* let post = db.collection("posteos").doc(this.props.postData.id);

        post.update() */
        db.collection('posts').doc(this.props.postData.id).update({
            likes: firebase.firestore.FioldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=>{
            this.setState({
                likes: this.postData.data.likes.legth,
                myLike: false
            })
        })
    
    }

    render(){
        console.log(this.props.postData) 
        return(
             
           <View style={styles.container}>
               {
                   this.state.myLike == false ?
                   <TouchableOpacity onpress={()=>this.likePost()}>
                       <Text>Me gusta</Text>
                       {/* <FontAwsomeIcon syle={style.icon} icon={farHeart}/> */}
                   </TouchableOpacity>:
                   <TouchableOpacity onpress={()=>this.unLikePost()}>
                   {/* <FontAwsomeIcon syle={style.icon} icon={farHeart}/> */}
                   <Text>Me gusta</Text>
               </TouchableOpacity>

               }
               <Text style={styles.likes}> <b>likes: {this.state.likes} </b> </Text>
               <Text style={styles.user}> <b>{this.props.postData.data.owner}</b>{this.props.postData.data.textp}</Text>
           </View>

        )
    }
}
const styles = StyleSheet.create({
    container:{

    },
    Likes:{

    },

})

export default Post;