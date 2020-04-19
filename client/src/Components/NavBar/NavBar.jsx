import React, { Component } from "react";
import "./NavBar.css";
import { NavLink, withRouter } from "react-router-dom";

class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar-nav-container ">
        <div className="NavBar-nav-left">
          <li>Logo</li>
          <NavLink to="/" exact activeClassName="NavBar-nav-link-active">
            Home
          </NavLink>
          <NavLink to="/about" exact activeClassName="NavBar-nav-link-active">
            About
          </NavLink>
        </div>
        <div className="NavBar-nav-right">
          {!this.props.user ? (
            <>
              <NavLink
                to="/login"
                exact
                activeClassName="NavBar-nav-link-active"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                exact
                activeClassName="NavBar-nav-link-active"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div className="NavBar-nav-right-user-signed">
              <div
                onClick={() =>
                  this.props.enableRecommender(!this.props.recommender)
                }
                className={`recommender-btn ${
                  this.props.recommender ? "recommender-btn-enable" : ""
                }`}
              >
                {this.props.recommender ? "Enabled" : "Recommend"}
              </div>
              <NavLink
                to="/me"
                exact
                activeClassName="NavBar-nav-profile-active"
              >
                <img
                  className="NavBar-user-profile-img"
                  src={`${
                    this.props.user.profile_img &&
                    this.props.user.profile_img !== "default"
                      ? this.props.user.profile_img
                      : "/images/default_profile/default.png"
                  }`}
                  alt="profile_img"
                />
              </NavLink>
              <NavLink
                to="/logout"
                exact
                activeClassName="NavBar-nav-link-active"
                // onClick={this.props.logout()}
              >
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

export default withRouter(NavBar);
