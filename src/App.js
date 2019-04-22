import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Login from './containers/Login';
import Register from './containers/Register';
import Home from './containers/Home';
import Idea from './containers/Idea';
import NewIdea from './containers/NewIdea';
import User from './containers/User';

import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import Header from './components/Header';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>

          <ProtectedRoute exact path="/" component={Home}/>
          <ProtectedRoute exact path="/idea/:id" component={Idea}/>
          <ProtectedRoute exact path="/new" component={NewIdea}/>
          <ProtectedRoute exact path="/user/:id" component={User}/>
          <AuthRoute path="/login" component={Login}/>
          <AuthRoute path="/register" component={Register}/>
        </div>
      </Router>
    );
  }
}

export default App;
