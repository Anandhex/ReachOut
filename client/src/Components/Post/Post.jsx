import React, { Component } from "react";
import moment from "moment";
import "./Post.css";
import { API_BASE_URL } from "../../util/apiUtil";
import jwt from "../../util/jwt";
import axios from "axios";
import { toast } from "react-toastify";
export class Post extends Component {
  handleLike = async (e) => {
    if (
      this.props.user &&
      !this.props.user.liked.includes(this.props.post._id)
    ) {
      try {
        e.target.src = e.target.src.replace(/\/[^\/]*$/, "/like.svg");
        const api =
          API_BASE_URL +
          `users/${this.props.user._id}/posts/${this.props.post._id}`;
        const headers = jwt.getAuthHeader();
        const likes = this.props.post.likes + 1;
        const resp = await axios.patch(api, likes, { headers });
        console.log(resp.data.data);
        this.props.setPost(resp.data.data.post);
        this.props.setUser(resp.data.data.user);
        toast.info("Liked!");
        // .then((resp) => {
        //   console.log(resp.data.data);
        //   this.props.setPost(resp.data.data.post);
        //   this.props.setUser(resp.data.data.user);
        // })
        // .catch((err) => console.log(err));
      } catch (err) {
        console.log(err);
        if (!err.response) {
          toast.error("Something went wrong!");
        } else {
          toast.error(err.response.data.message);
        }
      }
    }
  };

  handleCategory = (e) => {
    e.stopPropagation();
    this.props.history.push(`/specficPostCategory/${this.props.post.category}`);
  };

  handleUserClicked = (e) => {
    e.stopPropagation();
    if (this.props.user && this.props.user._id === this.props.post.userId) {
      this.props.history.push("/me");
    } else {
      this.props.history.push(`/user/${this.props.post.userId}`);
    }
  };
  handleComment = (e) => {
    e.stopPropagation();
    this.props.history.push(`/posts/${this.props.post._id}`);
  };

  render() {
    return (
      <div className="Post-container">
        <div className="Post-title">{this.props.post.postTitle}</div>
        <div className="Post-label">
          <div className="Post-cat" onClick={(e) => this.handleCategory(e)}>
            <span className="hash-tag">#</span>
            {this.props.post.category}
          </div>
          <div className="Post-user" onClick={(e) => this.handleUserClicked(e)}>
            {this.props.post.username}
            <span style={{ display: "block" }}>
              {moment(this.props.post.createDate).format("Do MMM")}
            </span>
          </div>
        </div>
        <div className="Post-body">
          {`${
            this.props.post.postContent &&
            this.props.post.postContent.slice(0, 150)
          } .... `}
          <br />
          <span
            className="read-more-tag"
            onClick={(e) => this.handleComment(e)}
          >
            Read more
          </span>
        </div>
        <div className="Post-footer">
          <div className="Post-stats">
            <img
              onClick={(e) => !this.props.isOwner && this.handleLike(e)}
              className="post-stat-image"
              src={
                this.props.isLiked
                  ? "/images/icons/like.svg"
                  : "/images/icons/like-not.png"
              }
              alt="like"
            />
            {this.props.isOwner && this.props.post.likes}
          </div>
          <div className="Post-stats" onClick={(e) => this.handleComment(e)}>
            <img
              className="post-stat-image"
              src="/images/icons/comment.svg"
              alt="comment"
            />
            {this.props.isOwner && this.props.post.comments.length}
          </div>
        </div>
      </div>
    );
  }
}

export default Post;
