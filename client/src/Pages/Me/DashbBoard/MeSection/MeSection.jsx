import React, { Component } from "react";
import "./MeSection.css";
import { getUserProfileImage } from "../../../../util/commonMethods";
import $ from "jquery";

export class MeSection extends Component {
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
            <div className="dashboard-stats">
              <div className="dashboard-title">Saved</div>
              <div className="dashboard-count">30</div>
            </div>
            <div className="dashboard-stats">
              <div className="dashboard-title">Dislikes</div>
              <div className="dashboard-count dashboard-dislikes">1</div>
            </div>
          </div>
          <div className="dashboard-top-posts-container">
            <div className="dashboard-top-posts-header">Top Posts</div>
            <div className="dashboard-post-container">
              <div className="dashboard-post">Post 1</div>
              <div className="dashboard-post">Post 2</div>
              <div className="dashboard-post">Post 3</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MeSection;
