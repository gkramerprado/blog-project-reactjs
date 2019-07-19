import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import firebase from './firebase';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import NewPost from './pages/NewPost';
import './global.css';

class App extends Component {

  state = {
    firebaseInit: false
  };

  componentDidMount() {
    firebase.isInitialized().then(resultado => {
      // devolve o usuario
      this.setState({ firebaseInit: resultado });
    });
  }

  render() {
    return this.state.firebaseInit !== false ? (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard/new_post" component={NewPost} />
        </Switch>
      </BrowserRouter>
    ) : (
        <h1 className="loading"> Carregando...</h1>
      );
  }
}

export default App;