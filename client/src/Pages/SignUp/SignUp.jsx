import React, { Component } from "react";
import axios from "axios";

import "./SignUp.css";
import ServerResponse from "../../Components/ServerResponse/ServerResponse";
import { API_BASE_URL } from "../../util/apiUtil";
import Loader from "../../Components/Loader/Loader";
import { Redirect } from "react-router-dom";
import jwt from "../../util/jwt";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      error: null,
      isLoading: false,
      isBoarded: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  toggleLoadingState = () => {
    this.setState({ isLoading: !this.state.isLoading });
  };
  handleClick = () => {
    const { username, email, password, passwordConfirm } = this.state;
    let api = API_BASE_URL;
    if (
      this.props.isSignIn &&
      username &&
      email &&
      password &&
      passwordConfirm
    ) {
      api = API_BASE_URL + "users/signup";
      this.toggleLoadingState();
      axios
        .post(api, {
          username,
          email,
          password,
          passwordConfirm,
        })
        .then((resp) => {
          this.toggleLoadingState();
          const data = resp.data;
          jwt.setJWt(data.token);
          this.props.setUser(data.data.user);
        })
        .catch((error) => {
          const { data } = error.response;
          this.setState(
            {
              error: { message: data.message, messageType: "error" },
            },
            () => {
              this.toggleLoadingState();
              setTimeout(() => this.setState({ error: null }), 3000);
            }
          );
        });
    } else if (this.props.isSignIn === false && username && email && password) {
      api = API_BASE_URL + "users/login";
      axios
        .post(api, {
          username,
          email,
          password,
        })
        .then((resp) => {
          this.toggleLoadingState();
          const data = resp.data;
          jwt.setJWt(data.token);
          this.props.setUser(data.data.user);
          this.setState({ isBoarded: data.data.user.isBoarded });
        })
        .catch((error) => {
          let data;
          if (error.response) {
            data = error.response;
            if (/^4*/.test(data.status)) {
              data = data.data;
            }
          } else {
            data = { message: "Something went wrong!" };
          }

          this.setState(
            {
              error: { message: data.message, messageType: "error" },
            },
            () => {
              this.toggleLoadingState();
              setTimeout(() => this.setState({ error: null }), 3000);
            }
          );
        });
    } else {
      this.setState(
        {
          error: { message: "Enter all the fields", messageType: "error" },
        },
        () => {
          this.toggleLoadingState();
          setTimeout(() => this.setState({ error: null }), 3000);
        }
      );
    }
    this.toggleLoadingState();
  };

  render() {
    if (localStorage.getItem("jwt")) {
      if (!this.state.isBoarded) {
        return <Redirect to="/selectInterst" />;
      }
      return <Redirect exact to="/" />;
    } else
      return (
        <>
          {this.state.error ? <ServerResponse {...this.state.error} /> : ""}
          {this.state.isLoading ? <Loader /> : ""}
          {this.props.isSignIn ? (
            <form className=" page SignUp-container">
              <div className="SignUp-form">
                <div className="SignUp-form-header">Create an Account!</div>
                <div className="SignUp-form-input-field">
                  <label htmlFor="username">Username </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="john@doe"
                    value={this.state.username}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="SignUp-form-input-field">
                  <label htmlFor="email">Email </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john@gmail.com"
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="SignUp-form-input-field">
                  <label htmlFor="password">Password </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    min="8"
                    placeholder="password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="SignUp-form-input-field">
                  <label htmlFor="passwordConfirm">Confirm Password </label>
                  <input
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    min="8"
                    placeholder="confirm password"
                    value={this.state.passwordConfirm}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="SignUp-form-button">
                  <input
                    type="button"
                    value="Sign Up"
                    onClick={this.handleClick}
                  />
                </div>
              </div>
            </form>
          ) : (
            <form className="SignUp-container">
              <div className="SignUp-form">
                <div className="SignUp-form-header">Log into Account!</div>
                <div className="SignUp-form-input-field">
                  <label htmlFor="username">Username </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="john@doe"
                    value={this.state.username}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="SignUp-form-input-field">
                  <label htmlFor="email">Email </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="john@gmail.com"
                    value={this.state.email}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="SignUp-form-input-field">
                  <label htmlFor="password">Password </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    min="8"
                    placeholder="password"
                    value={this.state.password}
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="SignUp-form-button">
                  <input
                    type="button"
                    value="log in"
                    onClick={this.handleClick}
                  />
                </div>
              </div>
            </form>
          )}
        </>
      );
  }
}

export default SignUp;
