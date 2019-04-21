import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';
import Login from './containers/Login';
import Home from './containers/Home';
import Header from './components/Header';
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>

          <ProtectedRoute exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

export default App;
