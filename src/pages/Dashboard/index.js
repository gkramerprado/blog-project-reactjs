import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import './dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: localStorage.nome
        };

        this.logout = this.logout.bind(this);
    }

    logout = async () => {
        await firebase.logout().catch((error) => {
            console.log(error);
        });

        localStorage.removeItem('nome');

        this.props.history.push('/');
    }

    async componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/login');
            return null;
        }

        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome;
            this.setState({ nome: localStorage.nome });
        });
    }

    render() {
        const { nome } = this.state;
        return (
            <div id="dashboard">
                <header>
                    <Link to="/dashboard/new_post"> Novo Post </Link>
                    <button onClick={() => { this.logout() }}> Deslogar </button>
                </header>
                <div className="user-info">
                    <h1> Ola {nome}</h1>
                    <p>Logado com: {firebase.getCurrent()}</p>
                </div>
            </div>

        );
    }
}

export default withRouter(Dashboard);