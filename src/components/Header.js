import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Button from "./Button";
import Link from "./Link";
import "../styles/Header.css";
import logo from "../static/logo.png";
import user from "../static/user1.png";
import { apiUrl } from "../constants";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: true,
      user: {}
    }
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    this.setState({token});
    if (!token) {
      this.setState({isAuthenticated: false});
    } else {
      let url = apiUrl + 'user/info';
      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
      .then((response) => response.json())
      .then((responseJson) => {
        let user = responseJson;
        this.setState({user});
      })
      .catch((e) => {
        console.log(e);
      })
    }
  }

  logout() {
    let { token } = this.state;
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
    })
    .catch((e) => {
      console.log(e);
    })
  }

  render() {
    const { isAuthenticated } = this.state;
    let userid = this.state.user.id || '';

    return (
      <div className="header">
        <Link to="/">
          <img className="logo" src={logo} alt="IdeaHunt"/>
        </Link>
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
            <Link to={"/user/" + userid}>
              <img src={user} className="user-icon"/>
            </Link>
            <hr className="seperator"/>
            <Link to="/new">
              <Button label="ADD IDEA" type="secondary"/>
            </Link>
            <Button label="LOG OUT" type="third" onClick={this.logout.bind(this)}/>
          </div>
        }
      </div>
    );
  }
}

export default Header;