import React, { Component } from "react";
import "./Me.css";
import MeSection from "./DashbBoard/MeSection/MeSection";
import EditProfile from "./DashbBoard/EditProfile/EditProfile";
import Friends from "./DashbBoard/Friends/Friends";
import Posts from "./DashbBoard/Posts/Posts";
import Saved from "./DashbBoard/Saved/Saved";
import Error from "../Error/Error";

export class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionSelected: "Me",
    };
  }
  componentDidMount() {
    const activesection = document.getElementById(this.state.sectionSelected);
    activesection.classList.add("Me-side-bar-sub-section-active");
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.sectionSelected !== this.state.sectionSelected) {
      document
        .getElementById(prevState.sectionSelected)
        .classList.remove("Me-side-bar-sub-section-active");
      document
        .getElementById(this.state.sectionSelected)
        .classList.add("Me-side-bar-sub-section-active");
    }
  }

  setSelectedSection = (e) => {
    this.setState({ sectionSelected: e.target.id });
  };

  renderSection = () => {
    switch (this.state.sectionSelected) {
      case "Me":
        return (
          <MeSection
            user={this.props.user && this.props.user._id}
            {...this.props}
          />
        );
      case "Edit Profile":
        return (
          <EditProfile user={this.props.user} setUser={this.props.setUser} />
        );
      case "Friends":
        return (
          <Friends
            user={this.props.user}
            setUser={this.props.setUser}
            {...this.props}
          />
        );
      case "Posts":
        return <Posts user={this.props.user} {...this.props} />;
      case "Saved":
        return <Saved user={this.props.user} {...this.props} />;
      default:
        return <Error />;
    }
  };

  render() {
    return (
      <div className="Me-container">
        <div className="Me-side">
          <div className="Me-side-content">
            <div className="Me-side-bar-section">
              <div className="Me-side-bar-section-title"> User Settings </div>
              <div className="Me-side-bar-sub-section">
                <div id="Me" onClick={(e) => this.setSelectedSection(e)}>
                  Me
                </div>
                <div
                  id="Edit Profile"
                  onClick={(e) => this.setSelectedSection(e)}
                >
                  Edit Profile
                </div>
              </div>
            </div>
            <div className="Me-side-bar-section">
              <div className="Me-side-bar-section-title"> Connected</div>
              <div className="Me-side-bar-sub-section">
                <div id="Friends" onClick={(e) => this.setSelectedSection(e)}>
                  Friends
                </div>
                <div id="Posts" onClick={(e) => this.setSelectedSection(e)}>
                  Posts
                </div>
                <div id="Saved" onClick={(e) => this.setSelectedSection(e)}>
                  Liked
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Me-main">{this.renderSection()}</div>
      </div>
    );
  }
}

export default Me;
