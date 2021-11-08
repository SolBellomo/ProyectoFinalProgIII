import React, { Component } from 'react'
import { Text, Stylesheet, View } from 'react-native'

class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: 0,
            liked: false,
        }
    }

    receiveLikes() {
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

    likePosts(){
        
    }

    unlikePosts(){
        let post = db.collection("posteos").doc(this.props.postData.id);

        post.update()
    }

    
}

export default Post;