import React, { Component } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from "../../util/apiUtil";
import axios from "axios";
import { getUserProfileImage } from "../../util/commonMethods";
import jwt from "../../util/jwt";
import Loader from "../../Components/Loader/Loader";
import interests from "../../util/interest";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      postContent: "",
      postTitle: "",
      category: interests[0],
      isLoading: false,
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    const api = API_BASE_URL + "users";
    const headers = jwt.getAuthHeader();
    this.props.user &&
      axios
        .get(api + "/getFriendRecommendation", { headers })
        .then((resp) =>
          this.setState({ friends: resp.data.data, isLoading: false })
        )
        .catch((err) => console.log(err));
    this.setState({ isLoading: false });
  }

  addFriend = (e, id) => {
    e.stopPropagation();
    const api = API_BASE_URL + `users/friends/${id}`;
    const headers = jwt.getAuthHeader();
    this.setState({ isLoading: true });
    axios
      .patch(api, { userId: id }, { headers })
      .then((resp) => {
        this.props.setUser(resp.data.data.user);
        axios
          .get(API_BASE_URL + "users/getFriendRecommendation", { headers })
          .then((resp) => {
            this.setState({ friends: resp.data.data, isLoading: false });
          });
      })
      .catch((err) => console.log(err));
  };
  removeFromList = (e) => {
    e.stopPropagation();
    console.log("Remove Clicked");
  };

  showUserProfile = (id) => {
    this.props.history.push(`/user/${id}`);
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderAddFriendList = () => {
    return (
      this.props.user &&
      this.state.friends.map((friend) => (
        <div
          key={friend._id}
          className="friend-single"
          onClick={() => this.showUserProfile(friend._id)}
        >
          <div className="friend-image">
            <img src={getUserProfileImage(friend.profile_img)} alt="profile" />
          </div>
          <div className="friend-username">{friend.username}</div>
          <div className="friend-footer">
            <button
              className="btn-add"
              onClick={(e) => this.addFriend(e, friend._id)}
            >
              Add Friend
            </button>
            <button
              className="btn-cancel"
              onClick={(e) => this.removeFromList(e)}
            >
              Cancel
            </button>
          </div>
        </div>
      ))
    );
  };
  renderCreatePost = () => {
    return this.props.user ? (
      <div className="create-post">
        <textarea
          className="post-content-container"
          name="postContent"
          placeholder="The post content goes over here"
          value={this.state.postContent}
          onChange={(e) => this.handleChange(e)}
        ></textarea>
        <div className="post-body">
          <input
            type="text"
            name="postTitle"
            value={this.state.postTitle}
            onChange={(e) => this.handleChange(e)}
            placeholder="The post title"
          />
          <select
            value={this.state.category}
            name="category"
            onChange={(e) => this.handleChange(e)}
          >
            {interests.map((interest) => (
              <option
                key={interest}
                className="option-category"
                value={interest}
              >
                {interest}
              </option>
            ))}
          </select>
        </div>
      </div>
    ) : (
      ""
    );
  };
  render() {
    return (
      <>
        {this.state.isLoading ? <Loader /> : ""}
        <div className="Home-container page">
          <div className="friend-container">{this.renderAddFriendList()}</div>
          {this.renderCreatePost()}
        </div>
      </>
    );
  }
}

export default withRouter(Welcome);
