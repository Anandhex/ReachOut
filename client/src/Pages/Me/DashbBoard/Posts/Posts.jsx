import React, { Component } from "react";
import "./Posts.css";
import Post from "../../../../Components/Post/Post";
import { API_BASE_URL } from "../../../../util/apiUtil";
import axios from "axios";
export class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    const category = this.props.match && this.props.match.params.category;
    const api = API_BASE_URL + `users/posts?userId=${this.props.user._id}`;
    axios
      .get(api)
      .then((resp) => {
        this.setState({ posts: resp.data.data.posts });
      })
      .catch((err) => console.log(err));
  }
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
      <div className="page">
        {this.state.posts.length > 0 ? (
          <>
            <div className="category-title">User's Post</div>
            <div className="Posts-container">{this.renderPost()}</div>
          </>
        ) : (
          <div className="empty-friends">No Posts Made </div>
        )}
      </div>
    );
  }
}

export default Posts;
