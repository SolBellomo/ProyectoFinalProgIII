import React, {Component} from "react";
import {View, Text, ActivityIndicator} from 'react-native';

import { db } from "../Firebase/Config";

import Post from "../Components/Post";

class Search extends Component{
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            loading: false,
            input: ""
        }
    }

    componentDidMount(){
       
    }
    search(text){
        db.collection('posts').where('username','==', text).get().then(docs => {
            let posts=[];
            docs.forEach(doc => {
                posts.push({
                    id: doc.id,
                    data: doc.data()

                })
            })
            console.log(posts)
            this.setState({
                posts: posts,
                input: text
            })
        })  
        console.log(text)
    }

    render(){
        return(
            <View style= {styles.container}>
                
                  <Text style={styles.titulo}> Buscador </Text>
                  <TextInput
                style = {styles.buscador}
                placeholder = "Buscar usuario"
                onChangeText  = { (text) => this.search(text)} 
                />

                {
                    this.state.loading ? (
                        <ActivityIndicator color={"gray"} size={"small"} />
                    ) : (
                    <FlatList
                        style ={styles.flat}
                        data={this.state.posts}
                        keyExtractor={(item)=> item.id.toString()}
                        renderItem={({item})=> <Post info={item} />}
                    />
                    )
                }
                {
                    this.state.loading == false && this.state.posts.length == 0 && this.state.input.length > 0  ?
                    <Text> No se encontró al usuario o no tiene publicaciones. </Text> :
                    null

                }
            </View>
        )
    }
}



export default Search;
    
