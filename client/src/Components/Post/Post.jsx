import React, { Component } from "react";
import moment from "moment";
import "./Post.css";
import { API_BASE_URL } from "../../util/apiUtil";
import jwt from "../../util/jwt";
import axios from "axios";
export class Post extends Component {
  handleLike = (e) => {
    if (
      this.props.user &&
      !this.props.user.liked.includes(this.props.post._id)
    ) {
      e.target.src = e.target.src.replace(/\/[^\/]*$/, "/like.svg");
      const api =
        API_BASE_URL +
        `users/${this.props.user._id}/posts/${this.props.post._id}`;
      const headers = jwt.getAuthHeader();
      const likes = this.props.post.likes + 1;
      axios
        .patch(api, likes, { headers })
        .then((resp) => {
          console.log(resp.data.data);
          this.props.setPost(resp.data.data.post);
          this.props.setUser(resp.data.data.user);
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="Post-container">
        <div className="Post-title">{this.props.post.postTitle}</div>
        <div className="Post-label">
          <div className="Post-cat">
            <span className="hash-tag">#</span>
            {this.props.post.category}
          </div>
          <div className="Post-user">
            {this.props.post.username}{" "}
            <span style={{ display: "block" }}>
              {moment(this.props.post.createdAt).format("Do MMM")}
            </span>
          </div>
        </div>
        <div className="Post-body">
          {`${this.props.post.postContent.slice(0, 150)} .... `}
          <span className="read-more-tag"> Read more</span>
        </div>
        <div className="Post-footer">
          <div className="Post-stats">
            <img
              onClick={(e) => this.handleLike(e)}
              className="post-stat-image"
              src={
                this.props.isLiked
                  ? "/images/icons/like.svg"
                  : "/images/icons/like-not.png"
              }
              alt="like"
            />
          </div>
          <div className="Post-stats">
            <img
              className="post-stat-image"
              src="/images/icons/comment.svg"
              alt="comment"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
