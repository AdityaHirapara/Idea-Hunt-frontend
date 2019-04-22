import React, { Component } from "react";
import "../styles/Input.css";

class Input extends Component {
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
 
  render() {
    const { label, placeholder, type, value, onChange, icon, ...rest } = this.props;

    return (
      <div className="container">
        <div className="label">{label}</div>
        {
          icon &&
          <div className="icon">
            <img height={30} src={icon} alt={"icon"}/>
          </div>
        }
        <input
          className="input"
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={this.handleChange.bind(this)}
          {...rest}
          />
      </div>
    );
  }
}

export default Input;