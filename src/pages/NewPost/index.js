import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './new_post.css';

class NewPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            imagem: '',
            url: '',
            description: '',
            alert: '',
            progress: ''
        };

        this.cadastrar = this.cadastrar.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/');
            return null;
        }
    }

    cadastrar = async (e) => {
        e.preventDefault();

        const { title, imagem, description, url } = this.state;

        if (title !== '' && imagem !== '' && imagem !== null && description !== '' && url !== '') {
            let posts = firebase.app.ref('posts');
            let chave = posts.push().key;

            await posts.child(chave).set({
                titulo: title,
                image: url,
                descricao: description,
                autor: localStorage.nome
            });

            this.props.history.push('/');
        } else {
            this.setState({ alert: 'Preencha todos os campos !' });
        }
    }

    handleFile = async (e) => {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/png' || image.type === 'image/jpeg') {
                await this.setState({ imagem: image });
                this.handleUpload();
            } else {
                alert("Sao aceita apenas imagens PNG ou JPEG");
                this.setState({ imagem: null });
                return null;
            }

        }
    }

    handleUpload = async () => {
        const { imagem } = this.state;
        const currentUid = firebase.getCurrentUid();

        const uploadTask = firebase.storage.ref(`images/${currentUid}/${imagem.name}`).put(imagem);

        await uploadTask.on('state_changed',
            (snap) => {
                //progresso de upload
                const progress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                this.setState({ progress: progress });
            },
            (error) => {
                //Error
                console.log(error);
            },
            () => {
                //Sucesso
                firebase.storage.ref(`images/${currentUid}`)
                    .child(imagem.name).getDownloadURL()
                    .then(url => {
                        this.setState({ url: url });
                    });
            }
        );

    }

    render() {
        return (
            <div>
                <header id="new-post">
                    <Link to="/dashboard"> Voltar </Link>
                </header>
                <form onSubmit={this.cadastrar} id="form-post">
                    <span>{this.state.alert}</span>

                    <label>Titulo</label>
                    <input type="text" value={this.state.title} placeholder="Nome do Post" onChange={(e) => { this.setState({ title: e.target.value }) }} />

                    <label>Descricao</label>
                    <textarea type="textarea" value={this.state.description} placeholder="Descricao..." onChange={(e) => { this.setState({ description: e.target.value }) }} />

                    <label>Capa do Post</label>
                    <input type="file" onChange={this.handleFile} />
                    {this.state.url !== '' ?
                        <img src={this.state.url} width="250" height="150" alt="capa do post" />
                        : <progress value={this.state.progress} max="100" />
                    }

                    <button type="submit" > Criar Post </button>
                </form>
            </div>
        );
    }
}

export default withRouter(NewPost);