import React, { Component } from "react";
import "../styles/FormContainer.css";

class SearchBox extends Component {
  constructor(props) {
    super(props);
  }
  

  render() {
    const { children } = this.props;
    return (
      <div className={"card"}>
        {children}
      </div>
    );
  }
}

export default SearchBox;