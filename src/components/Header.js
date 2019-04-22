import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "./Button";
import Link from "./Link";
import "../styles/Header.css";
import logo from "../static/logo.png";
import { apiUrl } from "../constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true
    }
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    if (!token) {
      this.setState({isAuthenticated: false});
    }
  }

  logout() {
    let token = localStorage.getItem('token');
    let url = apiUrl + 'user/logout';
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        localStorage.removeItem('token');
        this.setState({isAuthenticated: false});
        window.location.reload();
      }
      console.log(responseJson);
    })
    .catch((e) => {
      console.log(e);
    })
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div className="header">
        <img className="logo" src={logo} alt="IdeaHunt"/>
        <h1 className="title">IdeaHunt</h1>
        {
          !isAuthenticated &&
          <div className="right">
            <Link to="/login">
              <Button label="LOG IN" type="secondary"/>
            </Link>
            <Link to="/register">
              <Button label="REGISTER" type="third"/>
            </Link>
          </div>
        }
        {
          isAuthenticated &&
          <div className="right">
            <Link to="/">
              <Button label="DASHBOARD" type="secondary"/>
            </Link>
            <Button label="LOG OUT" type="third" onClick={this.logout.bind(this)}/>
          </div>
        }
      </div>
    );
  }
}

export default Header;