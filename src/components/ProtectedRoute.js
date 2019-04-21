import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import "../styles/Link.css";

class ProtectedRoute extends Component {
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

  render() {
    const { component, ...rest } = this.props;

    return (
      <Route
      {...rest}
      render={props =>
        this.state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
    );
  }
}

export default ProtectedRoute;