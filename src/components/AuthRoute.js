import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

class AuthRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    }
  }

  componentWillMount() {
    let token = localStorage.getItem('token');
    if (token) {
      this.setState({isAuthenticated: true});
    }
  }

  render() {
    const { component, ...rest } = this.props;
    const Component = this.props.component;

    return (
      <Route
      {...rest}
      render={props =>
        !this.state.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
    );
  }
}

export default AuthRoute;