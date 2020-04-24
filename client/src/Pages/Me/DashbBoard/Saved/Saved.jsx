import React, { Component } from "react";
import "./Saved.css";
import { API_BASE_URL } from "../../../../util/apiUtil";
import axios from "axios";
import Post from "../../../../Components/Post/Post";
import jwt from "../../../../util/jwt";
import { toast } from "react-toastify";
export class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  async componentDidMount() {
    const api = API_BASE_URL + `users/getLikedPost`;
    const headers = jwt.getAuthHeader();
    try {
      const resp = await axios.get(api, { headers });
      this.setState({ posts: resp.data.data.post });
    } catch (err) {
      console.log(err);
      if (!err.response) {
        toast.error("Something went wrong!");
      } else {
        toast.error(err.response.data.message);
      }
    }
  }
  setPost = (post) => {
    this.setState({
      posts: this.state.posts.map((pt) => (pt._id === post._id ? post : pt)),
    });
  };
  renderPost = () => {
    return (
      this.state.posts &&
      this.state.posts.map((post) => (
        <Post
          isLiked={this.props.user && this.props.user.liked.includes(post._id)}
          key={post._id}
          setUser={this.props.setUser}
          user={this.props.user}
          post={post}
          setPost={this.setPost}
          {...this.props}
        />
      ))
    );
  };
  render() {
    return (
      <div className="page">
        {this.state.posts.length > 0 ? (
          <>
            <div className="category-title">Liked Post</div>
            <div className="Posts-container">{this.renderPost()}</div>
          </>
        ) : (
          <div className="empty-friends">No Posts Liked </div>
        )}
      </div>
    );
  }
}

export default Saved;
