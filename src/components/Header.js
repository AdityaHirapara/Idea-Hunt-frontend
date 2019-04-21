import React, { Component } from "react";
import Button from "./Button";
import Link from "./Link";
import "../styles/Header.css";
import logo from "../static/logo.png";

class Header extends Component {
  render() {
    return (
      <div className="header">
        <img className="logo" src={logo} alt="IdeaHunt"/>
        <h1 className="title">IdeaHunt</h1>
        <div className="right">
          <Link to="/login">
            <Button label="LOG IN" type="secondary"/>
          </Link>
          <Link to="/register">
            <Button label="REGISTER" type="third"/>
          </Link>
        </div>
      </div>
    );
  }
}

export default Header;