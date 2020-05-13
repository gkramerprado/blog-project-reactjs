import React, { Component } from 'react';
import firebase from '../../firebase';
import './home.css';

class Home extends Component {

    state = {
        posts: []
    };

    componentDidMount() {
        firebase.app.ref('posts').on("value", (snap) => {
            let state = this.state;

            state.posts = [];

            snap.forEach((post) => {
                state.posts.push({
                    key: post.key,
                    titulo: post.val().titulo,
                    image: post.val().image,
                    descricao: post.val().descricao,
                    autor: post.val().autor
                });
            });

            state.posts.reverse();

            this.setState(state);
        });
    }

    render() {
        return (
            <section id="post">
                {this.state.posts.map((post) => {
                    return (
                        <article key={post.key}>
                            <header>
                                <div className="title">
                                    <strong>{post.titulo}</strong>
                                    <span>Autor: {post.autor}</span>
                                </div>
                            </header>

                            <img src={post.image} alt="capa do post" />
                            <footer>
                                <p>{post.descricao}</p>
                            </footer>
                        </article>
                    );
                })}
            </section>
        );
    }


}

export default Home;