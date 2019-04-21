import React, { Component } from "react";
import "../styles/Button.css";

class Button extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    const { label, onClick, type } = this.props;

    return (
      <div className={"button " + type} onClick={onClick}>
        {label}
      </div>
    );
  }
}

export default Button;