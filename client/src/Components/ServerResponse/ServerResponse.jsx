import React, { Component } from "react";
import "./ServerResponse.css";
const MessageToColor = {
  error: "#f87575",
  info: "#00a2ff"
};
export class ServerResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: true
    };
  }

  handleClick = () => {
    this.setState({ render: false });
  };
  render() {
    return this.state.render ? (
      <div
        onClick={this.handleClick}
        style={{
          border: `5px solid ${MessageToColor[this.props.messageType]}`
        }}
        className="ServerResponse-container"
      >
        {this.props.message}
        <span>X</span>
      </div>
    ) : null;
  }
}

export default ServerResponse;
