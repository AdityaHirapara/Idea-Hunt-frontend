import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/Login.css";
import { apiUrl } from "../constants";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleUsernameInput(value) {
    this.setState({ username: value})
  }

  handlePasswordInput(value) {
    this.setState({ password: value})
  }

  loginUser() {
    let url = apiUrl + 'user/login';
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      let token = responseJson.token;
      localStorage.setItem('token', token);
      localStorage.setItem('username', this.state.username);
      if (token) {
        window.location.href = '../';
      }
    })
    .catch((e) => {
      console.log(e);
    })
  }
 
  render() {
    const { username, password } = this.state;

      return (
        <div>
          <div className={"Login"}></div>
          <FormContainer title="LOG IN">
            <Input label="Username" placeholder="Username" value={username} type="text" onChange={this.handleUsernameInput.bind(this)} required={true}/>
            <Input label="Password" placeholder="Password" value={password} type="password" onChange={this.handlePasswordInput.bind(this)} required={true}/>
            <Button label="LOG IN" onClick={this.loginUser.bind(this)} type="primary"/>
          </FormContainer>
        </div>
      );
  }
}

export default Login;