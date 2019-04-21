import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../styles/Link.css";

class LinkComponent extends Component {
  render() {
    const { to, children } = this.props;

    return (
      <Link to={to} className="link">
        {children}
      </Link>
    );
  }
}

export default LinkComponent;