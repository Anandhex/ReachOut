import React, { Component } from "react";
import JWT from "../../util/jwt";
import { Redirect } from "react-router-dom";
export class Logout extends Component {
  logout = () => {
    JWT.logout();
    this.props.logout();
  };
  render() {
    this.logout();
    return <Redirect to="/" />;
  }
}

export default Logout;
