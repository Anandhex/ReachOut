import React, { Component } from "react";
import "./Home.css";
import { withRouter } from "react-router-dom";
import { API_BASE_URL } from "../../util/apiUtil";
import axios from "axios";
import { getUserProfileImage } from "../../util/commonMethods";
import jwt from "../../util/jwt";
import Loader from "../../Components/Loader/Loader";
import interests from "../../util/interest";
import Post from "../../Components/Post/Post";
class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      postContent: "",
      postTitle: "",
      category: interests[0],
      isLoading: false,
      showMore: false,
      posts: [],
    };
  }
  componentDidMount() {
    this.setState({ isLoading: true });
    let api = API_BASE_URL + "users";
    const headers = jwt.getAuthHeader();
    this.props.user &&
      axios
        .get(api + "/getFriendRecommendation", { headers })
        .then((resp) =>
          this.setState({ friends: resp.data.data, isLoading: false })
        )
        .catch((err) => console.log(err));
    api =
      api +
      `/${jwt.getId()}/posts/getRecommendPost${
        this.props.isRecommended ? "?recommend=true" : ""
      }`;
    this.props.user &&
      axios
        .get(api, { headers })
        .then((resp) => {
          this.setState({ posts: resp.data.data.posts });
        })
        .catch((err) => console.log(err));
    api = API_BASE_URL + "users/posts";
    !this.props.user &&
      axios
        .get(api)
        .then((resp) => {
          console.log(resp);
          this.setState({ posts: resp.data.data.posts });
        })
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
  removeFromList = (e, id) => {
    e.stopPropagation();
    this.setState({
      friends: this.state.friends.filter((frined) => frined._id !== id),
    });
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
              onClick={(e) => this.removeFromList(e, friend._id)}
            >
              Cancel
            </button>
          </div>
        </div>
      ))
    );
  };
  showPostTextFull = (e) => {
    e.stopPropagation();
    this.setState({ showMore: true });
  };
  closePost = (e) => {
    e.stopPropagation();
    this.setState({ showMore: false });
  };
  createPost = () => {
    const { postContent, postTitle, category } = this.state;
    const username = this.props.user && this.props.user.username;
    if (postContent && postTitle && category) {
      this.setState({ isLoading: true });
      const userId = jwt.getId();
      const api = API_BASE_URL + `users/${userId}/posts`;
      const headers = jwt.getAuthHeader();
      axios
        .post(api, { username, postContent, postTitle, category }, { headers })
        .then((resp) => {
          this.setState({ isLoading: false });
          console.log(resp);
        })
        .catch((err) => console.log(err));
    }
  };
  renderCreatePost = () => {
    return this.props.user ? (
      <div className="create-post" onClick={(e) => this.showPostTextFull(e)}>
        <div
          className={`create-post-label ${
            this.state.showMore ? "create-post-active" : ""
          }`}
        >
          Create Post
        </div>
        <div className="text-area-container">
          <textarea
            className="post-content-container"
            name="postContent"
            placeholder="The post content goes over here"
            value={this.state.postContent}
            onChange={(e) => this.handleChange(e)}
          ></textarea>
        </div>
        {this.state.showMore && (
          <div className="post-body">
            <input
              className="post-title"
              type="text"
              name="postTitle"
              value={this.state.postTitle}
              onChange={(e) => this.handleChange(e)}
              placeholder="The post title"
            />
            <select
              value={this.state.category}
              name="category"
              className="post-category"
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
            <button className="post-create" onClick={this.createPost}>
              Create Post
            </button>
          </div>
        )}
      </div>
    ) : (
      ""
    );
  };

  setPost = (post) => {
    this.setState({
      posts: this.state.posts.map((pt) => (pt._id === post._id ? post : pt)),
    });
  };

  renderPost = () => {
    return this.state.posts.map((post) => (
      <Post
        isLiked={this.props.user && this.props.user.liked.includes(post._id)}
        key={post._id}
        setUser={this.props.setUser}
        user={this.props.user}
        post={post}
        setPost={this.setPost}
        {...this.props}
      />
    ));
  };
  render() {
    return (
      <>
        {this.state.isLoading ? <Loader /> : ""}
        <div className="Home-container page" onClick={(e) => this.closePost(e)}>
          <div className="friend-container">{this.renderAddFriendList()}</div>
          {this.renderCreatePost()}
          <div className="Posts-container">{this.renderPost()}</div>
        </div>
      </>
    );
  }
}

export default withRouter(Welcome);
