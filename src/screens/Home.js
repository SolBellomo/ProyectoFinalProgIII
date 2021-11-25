import React, { Component } from 'react';
import { View, FlatList, StyleSheet} from 'react-native';

import { db } from '../firebase/config';
import Post from '../components/Post'

class Home extends Component {
    constructor() {
      super();
      this.state = {   
        posts: [],
        comments: [],
      }
    }

    componentDidMount() { //se ejecuta siempre que el componente se renderiza. Los pedidos asincrónicos de datos en el método cambian el estado interno y fuerzan una nueva renderización con esa información recibida.
      this.showPost();
      this.showComments();
    }

    showPost() {
       //para obtener datos de una colección (de NewPostForm.js)
      db.collection('posts').onSnapshot((docs) => {  //onSnapShot hace que firebase entregue la información actualizada. | Trae un array de documentos que recorremos y los coloca en docs
          let posteos = [] //para guardar los datos que vamos a pasar al estado del componente
          docs.forEach((doc) => { //recorremos el array
              posteos.push({ //pusheamos un objeto literal 
                  id: doc.id, //id de cada documento
                  data: doc.data() //con data() extraemos los datos de cada documento que recorrimos
              })
          })
          this.setState({
              posts: posteos //guardamos en 'posts' todo el array y lo agrega al estado del componente que después se renderizan en la FlatList
          })
      })
    }

    showComments(){
        db.collection('comments').onSnapshot((comm) => {
          let comments = []
          comm.forEach((com) => {
              comments.push({
                  id: com.id,
                  data: com.data()
              })
          })
          this.setState({
              comments: comments
          })
      })
    }

    render(){
        return(

          <View style={styles.container}>
            <FlatList // componente que sirve para traer un array y hacerlo scrolleable
                data={this.state.posts} // es la información que vas a traer, el array de datos que quiero recorrer
                keyExtractor={(post) => post.id} // Lo que identifica cada elemento del array
                renderItem = {({item})=> <Post postData={item}/>} // Traigo el Componente que va a renderizarse. Item es cada elemento del array y tiene que ser un objeto literal
            />
            </View>
        )            
    }

}
const styles = StyleSheet.create({
    container: {
        textAlign: 'center',
        padding: 10,
        backgroundColor: 'white',
    },

    image:{
        height: 250,
    },

    flatList:{
        justifyContent:'space-between'
    },

    touchable:{
        padding: 4,
        backgroundColor: '#ccc',
        marginBottom: 10,
        borderRadius: 4,
    },

    touchableText:{
        fontWeight: 'bold'
    },
});

export default Home;