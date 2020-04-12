import React, { Component } from "react";
import "./Friends.css";
import { API_BASE_URL } from "../../../../util/apiUtil";
import axios from "axios";
import jwt from "../../../../util/jwt";
import { getUserProfileImage } from "../../../../util/commonMethods";
export class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
    };
  }
  componentDidMount() {
    this.setState({ friends: this.props.user.friends });
  }
  showUserProfile = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/user/${id}`);
  };
  removeFriend = (e, id) => {
    e.stopPropagation();
    const headers = jwt.getAuthHeader();
    const api = API_BASE_URL + `users/friends/${id}`;
    axios
      .delete(api, { headers })
      .then((resp) => {
        this.setState({ friends: resp.data.data.user.friends });
        this.props.setUser(resp.data.data.user);
      })
      .catch((err) => console.log(err));
  };
  renderFriends = () => {
    return this.state.friends.map((friend) => (
      <div
        key={friend && friend._id}
        className="friend-single"
        onClick={(e) => this.showUserProfile(e, friend._id)}
      >
        <div className="friend-image">
          <img
            src={getUserProfileImage(friend && friend.profile_img)}
            alt="profile"
          />
        </div>
        <div className="friend-username">{friend && friend.username}</div>
        <div className="friend-footer">
          <button onClick={(e) => this.removeFriend(e, friend._id)}>
            remove
          </button>
        </div>
      </div>
    ));
  };
  render() {
    return (
      <div className="page">
        {this.state.friends.length ? (
          <div className="friends-container">{this.renderFriends()}</div>
        ) : (
          <div className="empty-friends">No Friends Added </div>
        )}
      </div>
    );
  }
}

export default Friends;
