import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/Login.css";
import { apiUrl } from "../constants";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    }
  }

  handleUsernameInput(value) {
    this.setState({ username: value});
  }

  handleEmailInput(value) {
    this.setState({ email: value});
  }

  handlePasswordInput(value) {
    this.setState({ password: value});
  }

  registerUser() {
    let url = apiUrl + 'user/register';
    if (!this.state.username.trim()) {
      this.setState({message: "Enter valid Username"});
    } else if (!this.state.email.trim()) {
      this.setState({message: "Enter valid Email"});
    } else if (!this.state.password.trim()) {
      this.setState({message: "Enter valid Password"});
    } else {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
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
        console.log(responseJson);
      })
      .catch((e) => {
        console.log(e);
      })
    }
  }
 
  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <div className={"Login"}></div>
        <FormContainer title="REGISTER">
          <Input label="Username" placeholder="What should we call you?" value={username} type="text" onChange={this.handleUsernameInput.bind(this)} required={true}/>
          <Input label="Email" placeholder="Your Email" value={email} type="email" onChange={this.handleEmailInput.bind(this)} required={true}/>
          <Input label="Password" placeholder="Your Password" value={password} type="password" onChange={this.handlePasswordInput.bind(this)} required={true}/>
          <Button label="Register" onClick={this.registerUser.bind(this)} type="primary"/>
        </FormContainer>
      </div>
    );
  }
}

export default Register;