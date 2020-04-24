import React, { Component } from "react";
import "./ChangePassword.css";
import { API_BASE_URL } from "../../../../../util/apiUtil";
import axios from "axios";
import Loader from "../../../../../Components/Loader/Loader";
import ServerResponse from "../../../../../Components/ServerResponse/ServerResponse";
import { toast } from "react-toastify";
export class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isLoading: false,
      error: null,
    };
  }
  renderButtonText = () => {
    switch (this.state.count) {
      case 0:
        return "Send";
      case 1:
        return "Resend";
      default:
        return "Please wait";
    }
  };
  handleClick = async () => {
    this.setState({ count: this.state.count + 1, isLoading: true });
    const api = API_BASE_URL + `users/forgotPassword`;
    let body = {
      email: this.props.user && this.props.user.email,
    };
    try {
      await axios.post(api, body);
      toast.info("Succesfully email sent!");
    } catch (err) {
      console.log(err);
      if (!err.response) {
        toast.error("Something went wrong!");
      } else {
        toast.error(err.response.data.message);
      }
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const text = this.renderButtonText();
    return (
      <>
        {this.state.error ? <ServerResponse {...this.state.error} /> : ""}
        {this.state.isLoading ? <Loader /> : ""}
        <div className="Change-password">
          <div className="Change-password-container">
            To change your password please click on the button below. A email
            will be sent to you with the link to the registerd email in our
            platform where you can change your password accordingly. Please
            don't share the link with other
          </div>
          <div className="btn-update-container">
            <div className="SignUp-form-button">
              <input
                type="button"
                value={text}
                onClick={this.handleClick}
                disabled={this.state.count > 1}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ChangePassword;
