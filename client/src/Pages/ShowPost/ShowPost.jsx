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
      commentText: "",
      isEdit: false,
      editText: "",
      editcommentId: null,
      editPost: null,
      editPostContent: null,
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
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleComment = () => {
    if (this.props.user) {
      const api =
        API_BASE_URL +
        `users/${this.props.user._id}/posts/${this.state.post._id}/comments`;
      const headers = jwt.getAuthHeader();
      const body = {
        username: this.props.user.username,
        commentText: this.state.commentText,
        postId: this.state.post._id,
        userId: this.props.user._id,
      };
      axios
        .post(api, body, { headers })
        .then((resp) =>
          this.setState({ post: resp.data.data.data, commentText: "" })
        )
        .catch((err) => console.log(err));
    }
  };
  handleEditComment = () => {
    if (this.props.user) {
      const api =
        API_BASE_URL +
        `users/${this.props.user._id}/posts/${this.state.post._id}/comments/${this.state.editcommentId}`;
      const headers = jwt.getAuthHeader();
      const body = {
        username: this.props.user.username,
        commentText: this.state.editText,
        postId: this.state.post._id,
        userId: this.props.user._id,
      };
      axios
        .patch(api, body, { headers })
        .then((resp) =>
          this.setState({
            post: resp.data.data.data,
            editText: "",
            editcommentId: null,
            isEdit: false,
          })
        )
        .catch((err) => console.log(err));
    }
  };
  handleEdit = (e, id, comment) => {
    this.setState({ isEdit: true, editText: comment, editcommentId: id });
  };
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
  handleDelete = () => {
    if (this.props.user) {
      const api =
        API_BASE_URL +
        `users/${this.props.user._id}/posts/${this.state.post._id}/comments/${this.state.editcommentId}`;
      const headers = jwt.getAuthHeader();

      axios
        .delete(api, { headers })
        .then((resp) =>
          this.setState({
            post: resp.data.data.data,
            editText: "",
            editcommentId: null,
            isEdit: false,
          })
        )
        .catch((err) => console.log(err));
    }
  };
  renderComments = () => {
    return (
      <div className="comments">
        {this.state.post &&
          this.state.post.comments.map((comment) => (
            <div key={comment._id} className="commet">
              {this.state.editcommentId === comment._id ? (
                <div className="Add-comment-container">
                  <input
                    className="ShowPost-add-comment"
                    placeholder="Add a comment"
                    type="text"
                    name="editText"
                    value={this.state.editText}
                    onChange={(e) => this.handleChange(e)}
                  />
                  <div
                    className="comment-stat"
                    onClick={this.handleEditComment}
                  >
                    <img src="/images/icons/edit.svg" alt="edit" />
                  </div>

                  <div className="comment-stat" onClick={this.handleDelete}>
                    <img src="/images/icons/delete.svg" alt="delete" />
                  </div>
                </div>
              ) : (
                <div className="commet-text">
                  <span className="comment-stat">{comment.username}</span>
                  {comment.commentText}
                  {this.props.user &&
                  this.props.user.username === comment.username ? (
                    <span
                      className="edit-comment"
                      onClick={(e) =>
                        this.handleEdit(e, comment._id, comment.commentText)
                      }
                    >
                      <img src="/images/icons/edit.svg" alt="edit" />
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              )}
              <div className="comment-footer">
                <div className="comment-date">
                  {moment(comment.createDate).format("Do MMM")}
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  };
  handleCategory = (e) => {
    e.stopPropagation();
    this.props.history.push(`/specficPostCategory/${this.state.post.category}`);
  };
  handleUserClicked = (e) => {
    e.stopPropagation();
    if (this.props.user && this.props.user._id === this.state.post.userId) {
      this.props.history.push("/me");
    } else {
      this.props.history.push(`/user/${this.state.post.userId}`);
    }
  };
  handleEditPost = () => {
    this.setState({
      editPost: true,
      editPostContent: this.state.post.postContent,
    });
  };
  handleDeletePost = () => {
    const api =
      API_BASE_URL +
      `users/:${this.props.user && this.props.user._id}/posts/${
        this.state.post._id
      }`;
    const headers = jwt.getAuthHeader();
    axios
      .delete(api, { headers })
      .then((resp) => {
        this.props.history.goBack();
        this.setState({
          post: null,
          editPost: false,
          editPostContent: null,
        });
      })
      .catch((err) => console.log(err));
  };
  handleUpdatePost = () => {
    const api =
      API_BASE_URL +
      `users/:${this.props.user && this.props.user._id}/posts/${
        this.state.post._id
      }`;
    const headers = jwt.getAuthHeader();
    const body = {
      ...this.state.post,
      postContent: this.state.editPostContent,
    };
    axios
      .patch(api, body, { headers })
      .then((resp) => {
        this.props.history.goBack();

        this.setState({
          post: resp.data.data.data,
          editPost: false,
          editPostContent: null,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <div className="page">
        <div className="ShowPost-container">
          <div className="Post-container">
            <div className="Post-title">
              {this.state.post && this.state.post.postTitle}
              {this.props.user &&
              this.props.user._id ===
                (this.state.post && this.state.post.userId) ? (
                this.state.editPost ? (
                  <span
                    className="edit-option-available"
                    onClick={this.handleDeletePost}
                  >
                    <img src="/images/icons/delete.svg" alt="delete" />
                  </span>
                ) : (
                  <span
                    className="edit-option-available"
                    onClick={this.handleEditPost}
                  >
                    <img src="/images/icons/edit.svg" alt="edit" />
                  </span>
                )
              ) : (
                ""
              )}
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
            {this.state.editPost ? (
              <div className="text-area-container">
                <textarea
                  className="post-content-container"
                  name="editPostContent"
                  placeholder="The post content goes over here"
                  value={this.state.editPostContent}
                  onChange={(e) => this.handleChange(e)}
                ></textarea>
                <div className="btn-update-container">
                  <div className="SignUp-form-button">
                    <input
                      type="button"
                      value="update"
                      onClick={this.handleUpdatePost}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="Post-body">{`${
                this.state.post && this.state.post.postContent
              } `}</div>
            )}
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
          {this.props.user && (
            <div className="Add-comment-container">
              <input
                className="ShowPost-add-comment"
                placeholder="Add a comment"
                type="text"
                name="commentText"
                value={this.state.commentText}
                onChange={(e) => this.handleChange(e)}
              />
              <button className="create-post-btn" onClick={this.handleComment}>
                Add
              </button>
            </div>
          )}
          <div className="comment-container">{this.renderComments()}</div>
        </div>
      </div>
    );
  }
}

export default ShowPost;
