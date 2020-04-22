import React, { Component } from "react";
import "./MeSection.css";
import { getUserProfileImage } from "../../../../util/commonMethods";
import $ from "jquery";
import { API_BASE_URL } from "../../../../util/apiUtil";
import axios from "axios";
import Loader from "../../../../Components/Loader/Loader";
import Post from "../../../../Components/Post/Post";

export class MeSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      posts: [],
      isLoading: false,
    };
  }
  async componentDidMount() {
    $(".dashboard-count").each(function () {
      var $this = $(this);
      $({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 1500,
          easing: "swing",
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
        }
      );
    });
    this.setState({ isLoading: true });
    let userId = this.props.user;
    if (!userId) {
      userId = this.props.match && this.props.match.params.id;
    }
    if (userId) {
      try {
        let api = API_BASE_URL + `users/${userId}`;
        let resp = await axios.get(api);
        this.setState({ user: resp.data.data.user });
        api += "/posts?sort=-likes";
        resp = await axios.get(api);
        this.setState({ posts: resp.data.data.posts });
      } catch (err) {
        console.log(err);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }
  renderPost = () => {
    return this.state.posts
      .slice(3)
      .map((post) => (
        <Post
          isLiked={
            this.props.user &&
            this.props.user.liked &&
            this.props.user.liked.includes(post._id)
          }
          key={post._id}
          setUser={this.props.setUser}
          user={this.props.user}
          post={post}
          setPost={this.setPost}
          {...this.props}
          isOwner={post.userId === (this.props.user && this.props.user.userId)}
        />
      ));
  };

  renderTopPosts = () => {
    return (
      <>
        <div className="dashboard-post-container">
          {this.state.posts.slice(0, 3).map((post, idx) => (
            <div key={idx} id={idx} className="dashboard-post">
              <div className="dashboard-post-title">{post.postTitle}</div>
              <div className="dashboard-post-body">
                {post.postContent.slice(0, 180) + "..."}
              </div>
              <div className="dashboard-post-stats-container">
                <div className="dashboard-post-stats">
                  <div className="dashboard-stats-title">
                    <img src="/images/icons/like.svg" alt="like" />
                  </div>
                  <div className="dashboard-stats-content">{post.likes}</div>
                </div>
                <div className="dashboard-post-stats">
                  <div className="dashboard-stats-title">
                    <img src="/images/icons/comment.svg" alt="like" />
                  </div>
                  <div className="dashboard-stats-content">
                    {post.comments.length}
                  </div>
                </div>
                {/* <div className="dashboard-post-stats">
                <div className="dashboard-stats-title">
                  <img src="/images/icons/unlike.svg" alt="like" />
                </div>
                <div className="dashboard-stats-content">{post.dislikes}</div>
              </div> */}
              </div>
              {/* <div className="dashboard-post-comment-container">
                    {post.comments.slice(0, 3).map((comment) => (
                      <div className="dashboard-post-comment">
                        <div className="dashboard-post-commentText">
                          {comment.commentText}
                        </div>
                        <div className="dashboard-post-commentBy">
                          {comment.username}
                        </div>
                      </div>
                    ))}
                  </div> */}
            </div>
          ))}
        </div>
        <div className="Posts-container">{this.renderPost()}</div>
      </>
    );
  };
  render() {
    return (
      <>
        {this.state.isLoading ? <Loader /> : ""}
        <div className="page">
          <div className="MeSection-container">
            <div className="Profile-image-me-container">
              <img
                src={getUserProfileImage(
                  this.state.user && this.state.user.profile_img
                )}
                alt="profile_img"
                className="Profile-image-me"
              />
            </div>
            <div className="top-interests">
              <div className="top-interests-header">Following Topics</div>
              {this.state.user &&
                this.state.user.areaOfInterest
                  .filter((interest) => interest)
                  .map((interest) => (
                    <div className="top-interests-follow" key={interest}>
                      {interest}
                    </div>
                  ))}
            </div>
            <div className="Profile-username-me">
              {this.state.user && this.state.user.username}
            </div>
            <div className="Profile-username-dashboard-stats-container">
              <div className="dashboard-stats">
                <div className="dashboard-title">Likes</div>
                <div className="dashboard-count">100</div>
              </div>
              <div className="dashboard-stats">
                <div className="dashboard-title">Comments</div>
                <div className="dashboard-count">80</div>
              </div>
              <div className="dashboard-stats">
                <div className="dashboard-title">Posts</div>
                <div className="dashboard-count">70</div>
              </div>
              {/* <div className="dashboard-stats">
              <div className="dashboard-title">Saved</div>
              <div className="dashboard-count">30</div>
            </div> */}
              {/* <div className="dashboard-stats">
              <div className="dashboard-title">Dislikes</div>
              <div className="dashboard-count dashboard-dislikes">1</div>
            </div> */}
            </div>
            <div className="dashboard-top-posts-container">
              <div className="dashboard-top-posts-header">Top Posts</div>
            </div>
          </div>
          {this.renderTopPosts()}
        </div>
      </>
    );
  }
}

export default MeSection;
