import React, { Component } from "react";
import "./ProfileUpdate.css";
export class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      profileImg: "default",
    };
  }
  render() {
    return (
      <form className=" page SignUp-container">
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
          </div>
          <div className="SignUp-form-input-field">
            <label htmlFor="age">Age </label>
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
          </div>
        </div>
        <div className="SignUp-form-button">
          <input type="button" value="log in" onClick={this.handleClick} />
        </div>
      </form>
    );
  }
}

export default ProfileUpdate;
