import React, { Component } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from "../../util/apiUtil";
import axios from "axios";
import { getUserProfileImage } from "../../util/commonMethods";
import jwt from "../../util/jwt";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
  }
  componentDidMount() {
    const api = API_BASE_URL + "users";
    axios
      .get(api)
      .then((resp) => this.setState({ friends: resp.data.data.users }))
      .catch((err) => console.log(err));
    const headers = jwt.getAuthHeader();
    axios
      .get(api + "/getFriendRecommendation", { headers })
      .then((resp) => this.setState({ friends: resp.data.data }));
  }

  addFriend = (e, id) => {
    e.stopPropagation();
    const api = API_BASE_URL + `users/friends/${id}`;
    const headers = jwt.getAuthHeader();
    axios
      .patch(api, { userId: id }, { headers })
      .then((resp) => {
        this.props.setUser(resp.data.data.user);
        axios
          .get(API_BASE_URL + "users/getFriendRecommendation", { headers })
          .then((resp) => {
            console.log(resp.data.data);
            this.setState({ friends: resp.data.data });
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

  renderAddFriendList = () => {
    return this.state.friends.map((friend) => (
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
    ));
  };
  render() {
    return (
      <div className="Home-container page">
        <div className="friend-container">{this.renderAddFriendList()}</div>
      </div>
    );
  }
}

export default withRouter(Welcome);
