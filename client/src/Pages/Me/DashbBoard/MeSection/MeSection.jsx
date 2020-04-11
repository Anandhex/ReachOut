import React, { Component } from "react";
import "./MeSection.css";
import { getUserProfileImage } from "../../../../util/commonMethods";
import $ from "jquery";

export class MeSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          postTitle: "How thing works",
          postContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          likes: 20,
          dislikes: 10,
          comments: [{ username: "Anandhex", commentText: "things working" }],
        },
        {
          postTitle: "Shit thing works",
          postContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          likes: 20,
          dislikes: 10,
          comments: [{ username: "Anandhex", commentText: "things working" }],
        },
        {
          postTitle: "what thing works",
          postContent:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          likes: 20,
          dislikes: 10,
          comments: [{ username: "Anandhex", commentText: "things working" }],
        },
      ],
    };
  }
  componentDidMount() {
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
  }

  renderTopPosts = () => {
    return (
      <div className="dashboard-post-container">
        {this.state.posts.map((post, idx) => (
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
    );
  };
  render() {
    return (
      <div className="page">
        <div className="MeSection-container">
          <div className="Profile-image-me-container">
            <img
              // src={getUserProfileImage(this.props.user.profile_img)}
              src="/images/default_profile/default.png"
              alt="profile_img"
              className="Profile-image-me"
            />
          </div>
          <div className="Profile-username-me">
            {"this.props.user.username"}
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
    );
  }
}

export default MeSection;
