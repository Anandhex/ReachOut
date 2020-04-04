import React, { Component } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
class Welcome extends Component {
  render() {
    return <div className="Home-container page">Welcome</div>;
  }
}

export default withRouter(Welcome);
