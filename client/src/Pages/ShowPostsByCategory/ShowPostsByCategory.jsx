import React, { Component } from "react";
import "./ShowPostsByCategory.css";
import axios from "axios";
import { API_BASE_URL } from "../../util/apiUtil";
import Post from "../../Components/Post/Post";

export class ShowPostsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }

  componentDidMount() {
    const category = this.props.match && this.props.match.params.category;
    const api = API_BASE_URL + `users/posts?category=${category}`;
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
        <div className="category-title">
          {this.props.match && this.props.match.params.category}
        </div>
        <div className="Posts-container">{this.renderPost()}</div>
      </div>
    );
  }
}

export default ShowPostsByCategory;
