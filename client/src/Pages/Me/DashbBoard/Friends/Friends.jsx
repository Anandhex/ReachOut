import React, { Component } from "react";
import "./Friends.css";
import { API_BASE_URL } from "../../../../util/apiUtil";
import axios from "axios";
import jwt from "../../../../util/jwt";
import { getUserProfileImage } from "../../../../util/commonMethods";
import Loader from "../../../../Components/Loader/Loader";
export class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      isLoading: false,
    };
  }
  componentDidMount() {
    const api = API_BASE_URL + `users/friends`;
    const headers = jwt.getAuthHeader();
    axios
      .get(api, { headers })
      .then(({ data }) => {
        this.setState({ friends: data.data.data });
      })
      .catch((err) => console.log(err));
  }
  showUserProfile = (e, id) => {
    e.stopPropagation();
    this.props.history.push(`/user/${id}`);
  };
  removeFriend = (e, id) => {
    e.stopPropagation();
    this.setState({ isLoading: true });
    const headers = jwt.getAuthHeader();
    const api = API_BASE_URL + `users/friends/${id}`;
    axios
      .delete(api, { headers })
      .then((resp) => {
        this.setState({
          friends: resp.data.data.user.friends,
          isLoading: false,
        });
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
      <>
        {this.state.isLoading ? <Loader /> : ""}
        <div className="page">
          {this.state.friends.length ? (
            <div className="friends-container">{this.renderFriends()}</div>
          ) : (
            <div className="empty-friends">No Friends Added </div>
          )}
        </div>
      </>
    );
  }
}

export default Friends;
