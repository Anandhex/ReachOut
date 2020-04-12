import React, { Component } from "react";
import axios from "axios";

import "./General.css";
import { getUserProfileImage } from "../../../../../util/commonMethods";
import { API_BASE_URL } from "../../../../../util/apiUtil";
import jwt from "../../../../../util/jwt";
import ServerResponse from "../../../../../Components/ServerResponse/ServerResponse";
import Loader from "../../../../../Components/Loader/Loader";
export class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:
        this.props.user && this.props.user.username
          ? this.props.user.username
          : "N/A",
      email:
        this.props.user && this.props.user.email
          ? this.props.user.email
          : "N/A",
      dob: this.props.user && this.props.user.dob ? this.props.user.dob : "N/A",
      profile_img:
        this.props.user && this.props.user.profile_img
          ? getUserProfileImage(this.props.user.profile_img)
          : "/images/default_profile/default.png",
      isLoading: false,
      error: null,
    };
  }

  handleImageUpload = async (e) => {
    const data = new FormData();
    data.append("profileImage", e.target.files[0], e.target.files[0].name);
    this.setState({ isLoading: true });
    const api = API_BASE_URL + "users/profileUpload";
    let headers = jwt.getAuthHeader();
    headers = {
      ...headers,
      accept: "application/json",
      "Accept-Language": "en-US,en;q=0.8",
      "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
    };
    const resp = axios.post(api, data, { headers });
    resp
      .then((resp) => {
        this.props.setUser(resp.data.data.user);
        this.setState({
          profile_img: resp.data.data.user.profile_img,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState(
          {
            error: {
              message: error.response
                ? error.response.data.message
                : "Something went wrong!",
              messageType: "error",
            },
          },
          () => {
            setTimeout(
              () => this.setState({ error: "", isLoading: false }),
              3000
            );
          }
        );
      });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleClick = () => {
    const { username, dob, profile_img } = this.state;
    if (username && dob && profile_img) {
      this.setState({ isLoading: true });
      let api = API_BASE_URL + `users/${jwt.getId()}`;
      let body = {
        username,
        dob,
        profile_img,
      };
      const headers = jwt.getAuthHeader();
      axios
        .patch(api, body, { headers })
        .then((resp) => {
          this.props.setUser(resp.data.data.user);
          this.setState({ isLoading: false });
        })
        .catch((error) => {
          this.setState(
            {
              error: { message: error.response.message, messageType: "error" },
              isLoading: false,
            },
            () => {
              setTimeout(() => this.setState({ error: null }), 3000);
            }
          );
          console.log(error);
        });
    } else {
      this.setState(
        {
          error: {
            message: "Please fill all the details",
            messageType: "error",
          },
          isLoading: false,
        },
        () => {
          setTimeout(() => this.setState({ error: null }), 3000);
        }
      );
    }
  };
  render() {
    return (
      <>
        {this.state.error ? <ServerResponse {...this.state.error} /> : ""}
        {this.state.isLoading ? <Loader /> : ""}
        <div className="General-container">
          <div className="ProfileUpdate-img-upload-container">
            <img
              className="ProfileUpdate-img"
              src={this.state.profile_img}
              alt="profile"
            />
            <label htmlFor="profileImg" className="label-update-image">
              Upload
              <input
                id="profileImg"
                type="file"
                title="Upload"
                onChange={(e) => this.handleImageUpload(e)}
                name="profileImg"
              />
            </label>
          </div>

          <div className="profile-input">
            <div className="profile-input-container">
              <label>Username </label>
              <input
                type="text"
                value={this.state.username}
                name="username"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="profile-input-container">
              <label>Email </label>
              <input
                type="email"
                value={this.state.email}
                name="email"
                readOnly={true}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
            <div className="profile-input-container">
              <label>Age </label>
              <input
                min={14}
                type="number"
                value={this.state.dob}
                name="dob"
                max={120}
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
        </div>
        <div className="btn-update-container">
          <div className="SignUp-form-button">
            <input type="button" value="Update" onClick={this.handleClick} />
          </div>
        </div>
      </>
    );
  }
}

export default General;