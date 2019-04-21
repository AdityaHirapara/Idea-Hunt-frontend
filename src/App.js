import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import Login from './containers/Login';
import Register from './containers/Register';
import Home from './containers/Home';
import Idea from './containers/Idea';

import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </div>
      </Router>
    );
  }
}

export default App;
