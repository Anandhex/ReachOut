import React, { Component } from "react";
import axios from "axios";

import "./SignUp.css";
import ServerResponse from "../../Components/ServerResponse/ServerResponse";
import { API_BASE_URL } from "../../util/apiUtil";
import Loader from "../../Components/Loader/Loader";
import { Redirect } from "react-router-dom";
import jwt from "../../util/jwt";
import { toast } from "react-toastify";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      age: "",
      gender: "Male",
      error: null,
      isLoading: false,
      isBoarded: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = async () => {
    try {
      const {
        username,
        email,
        password,
        passwordConfirm,
        age,
        gender,
      } = this.state;
      let api = API_BASE_URL;

      if (
        this.props.isSignIn &&
        username &&
        email &&
        password &&
        passwordConfirm &&
        age &&
        gender
      ) {
        api = API_BASE_URL + "users/signup";
        try {
          this.setState({ isLoading: true });
          let resp = await axios.post(api, {
            username,
            email,
            password,
            passwordConfirm,
            age,
            gender,
          });
          const data = resp.data;
          jwt.setJWt(data.token);
          this.props.setUser(data.data.user);
          console.log(this.props);
          this.props.history.push("/selectInterst");
          toast.success("Successfully signed in!");
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
      } else if (
        this.props.isSignIn === false &&
        username &&
        email &&
        password
      ) {
        api = API_BASE_URL + "users/login";
        try {
          this.setState({ isLoading: true });
          let resp = await axios.post(api, {
            username,
            email,
            password,
          });
          const data = resp.data;
          jwt.setJWt(data.token);
          this.props.setUser(data.data.user);
          jwt.setBoarded(data.data.user.isBoarded);
          if (data.data.user.isBoarded) {
            this.props.history.push("/");
          } else {
            this.props.history.push("/selectInterst");
          }
          toast.success("Successfully logged in!");
        } catch (err) {
          console.log(err.response);
          if (!err.response) {
            toast.error("Something went wrong!");
          } else {
            toast.error(err.response.data.message);
          }
        } finally {
          this.setState({ isLoading: false });
        }
      } else {
        toast.error("Enter all the fields");
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return jwt.getBoarded() && jwt.getJWT() ? (
      <Redirect to="/" />
    ) : jwt.getJWT() ? (
      <Redirect to="/selectInterst" />
    ) : (
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
              <div className="SignUp-form-input-field">
                <label htmlFor="passwordConfirm">Age </label>
                <input
                  type="number"
                  name="age"
                  id="age"
                  min="18"
                  max="99"
                  placeholder="Enter your age"
                  value={this.state.age}
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              <div className="SignUp-form-input-field">
                <select
                  value={this.state.gender}
                  name="gender"
                  id="gender"
                  className="post-category"
                  onChange={(e) => this.handleChange(e)}
                >
                  <option className="option-category" value={"Male"}>
                    Male
                  </option>
                  <option className="option-category" value={"Female"}>
                    Female
                  </option>
                </select>
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
