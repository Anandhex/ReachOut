import React, { Component } from "react";
import "./ShowPost.css";
import { API_BASE_URL } from "../../util/apiUtil";
import axios from "axios";
import moment from "moment";
import jwt from "../../util/jwt";
export class ShowPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isOwner: false,
      isLiked: false,
    };
  }
  componentDidMount() {
    const isLiked =
      this.props.user &&
      this.props.user.liked.includes(this.props.match.params.postId);
    const api = API_BASE_URL + `users/posts/${this.props.match.params.postId}`;
    axios
      .get(api)
      .then((resp) => {
        this.setState({
          post: resp.data.data.post,
          isOwner:
            resp.data.data.post.userId ===
            (this.props.user && this.props.user._id),
          isLiked,
        });
      })
      .catch((err) => console.log(err));
  }

  handleLike = (e) => {
    if (
      this.props.user &&
      !this.props.user.liked.includes(this.state.post._id)
    ) {
      e.target.src = e.target.src.replace(/\/[^\/]*$/, "/like.svg");
      const api =
        API_BASE_URL +
        `users/${this.props.user._id}/posts/${this.state.post._id}`;
      const headers = jwt.getAuthHeader();
      const likes = this.state.post.likes + 1;
      axios
        .patch(api, likes, { headers })
        .then((resp) => {
          //   console.log(resp.data.data);
          //   this.props.setPost(resp.data.data.post);
          this.props.setUser(resp.data.data.user);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="page">
        <div className="ShowPost-container">
          <div className="Post-container">
            <div className="Post-title">
              {this.state.post && this.state.post.postTitle}
            </div>
            <div className="Post-label">
              <div className="Post-cat" onClick={(e) => this.handleCategory(e)}>
                <span className="hash-tag">#</span>
                {this.state.post && this.state.post.category}
              </div>
              <div
                className="Post-user"
                onClick={(e) => this.handleUserClicked(e)}
              >
                {this.state.post && this.state.post.username}
                <span style={{ display: "block" }}>
                  {moment(this.state.post && this.state.post.createDate).format(
                    "Do MMM"
                  )}
                </span>
              </div>
            </div>
            <div className="Post-body">{`${
              this.state.post && this.state.post.postContent
            } `}</div>
            <div className="Post-footer">
              <div className="Post-stats">
                <img
                  onClick={(e) => !this.props.isOwner && this.handleLike(e)}
                  className="post-stat-image single-post"
                  src={
                    this.state.isLiked
                      ? "/images/icons/like.svg"
                      : "/images/icons/like-not.png"
                  }
                  alt="like"
                />
                {this.state.isOwner && this.state.post && this.state.post.likes}
              </div>
              {/* <div className="Post-stats" onClick={(e) => this.handleComment(e)}>
              <img
                className="post-stat-image"
                src="/images/icons/comment.svg"
                alt="comment"
              />
              {this.props.isOwner &&
                this.state.post &&
                this.state.post.comments.length}
            </div> */}
            </div>
          </div>
        </div>
        <div className="ShowPost-add-comment-container">
          <input
            className="ShowPost-add-comment"
            placeholder="Add a comment"
            type="text"
          />
        </div>
      </div>
    );
  }
}

export default ShowPost;
