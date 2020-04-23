import React, { Component } from "react";
import axios from "axios";
import "./ProfileUpdate.css";
import { API_BASE_URL } from "../../util/apiUtil";
import jwt from "../../util/jwt";
import ServerResponse from "../../Components/ServerResponse/ServerResponse";
import Loader from "../../Components/Loader/Loader";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

export class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileImg: "default",
      interests: null,
      error: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      interests:
        this.props.history.location.state &&
        this.props.history.location.state.interests,
    });
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
    try {
      const resp = await axios.post(api, data, { headers });
      this.props.setUser(resp.data.data.user);
      this.setState({
        profileImg: resp.data.data.user.profile_img,
      });
      toast.info("User profile photo updated");
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
  handleChange = (e) => {
    if (e.target.name === "profileImg") {
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };
  previousPage = () => {
    this.props.history.goBack();
  };

  finishBoarding = async () => {
    if (this.state.interests.length) {
      let api = API_BASE_URL + `users/${jwt.getId()}`;
      let body = {
        areaOfInterest: this.state.interests,
        profile_img: this.state.profileImg,
        isBoarded: true,
      };
      const headers = jwt.getAuthHeader();
      try {
        const resp = await axios.patch(api, body, { headers });
        this.props.setUser(resp.data.data.user);
        jwt.setBoarded(true);
        this.props.history.push("/");
      } catch (err) {
        console.log(err);
        if (!err.response) {
          toast.error("Something went wrong!");
        } else {
          toast.error(err.response.data.message);
        }
      }
    } else {
      this.setState(
        {
          error: {
            message: "Please fill all the details",
            messageType: "error",
          },
        },
        () => {
          setTimeout(() => this.setState({ error: null }), 3000);
        }
      );
    }
  };

  render() {
    return jwt.getJWT() && jwt.getBoarded() ? (
      <Redirect to="/" />
    ) : (
      <>
        {this.state.error ? <ServerResponse {...this.state.error} /> : ""}
        {this.state.isLoading ? <Loader /> : ""}
        <form className=" page SignUp-container">
          <div
            onClick={this.finishBoarding}
            className="Interest-arrow-next-page"
          >
            <img
              src="https://img.icons8.com/plasticine/100/000000/arrow.png"
              alt="arrow"
            />
          </div>
          <div
            onClick={this.previousPage}
            className="Interest-arrow-previous-page"
          >
            <img
              src="https://img.icons8.com/plasticine/100/000000/arrow.png"
              alt="arrow"
            />
          </div>
          <div className="SignUp-form ProfileUpdate">
            <div className="SignUp-form-header">Update your Profile!</div>
            <div className="ProfileUpdate-img-upload-container">
              <img
                className="ProfileUpdate-img"
                src={`${
                  this.state.profileImg === "default"
                    ? "/images/default_profile/default.png"
                    : this.state.profileImg
                }`}
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
            {/* <div className="SignUp-form-input-field">
              <label htmlFor="age">
                Age <span style={{ color: "red", fontSize: "0.6rem" }}>*</span>
              </label>
              <input
                type="number"
                name="age"
                id="age"
                min="18"
                max="99"
                placeholder="18-99"
                value={this.state.age}
                onChange={(e) => this.handleChange(e)}
              />
            </div> */}
          </div>
        </form>
      </>
    );
  }
}

export default ProfileUpdate;
