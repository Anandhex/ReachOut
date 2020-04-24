import React, { Component } from "react";
import "./ShowPostsByCategory.css";
import axios from "axios";
import { API_BASE_URL } from "../../util/apiUtil";
import Post from "../../Components/Post/Post";
import Loader from "../../Components/Loader/Loader";
import { toast } from "react-toastify";

export class ShowPostsByCategory extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [], isLoading: false };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const category = this.props.match && this.props.match.params.category;
    const api = API_BASE_URL + `users/posts?category=${category}`;
    try {
      const resp = await axios.get(api);
      this.setState({ posts: resp.data.data.posts });
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
      <>
        {this.state.isLoading ? <Loader /> : ""}
        <div className="page">
          <div className="category-title">
            {this.props.match && this.props.match.params.category}
          </div>
          <div className="Posts-container">{this.renderPost()}</div>
        </div>
      </>
    );
  }
}

export default ShowPostsByCategory;
