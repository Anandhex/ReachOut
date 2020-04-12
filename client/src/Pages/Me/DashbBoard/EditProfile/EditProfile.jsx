import React, { Component } from "react";
import "./EditProfile.css";
import General from "./General/General";
import Preference from "./Preference/Preference";
import ChangePassword from "./ChangePassword/ChangePassword";
import Error from "../../../Error/Error";
export class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "General",
    };
  }
  componentDidMount() {
    document
      .getElementById(this.state.activeTab)
      .classList.add("edit-profile-tab-active");
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab) {
      document
        .getElementById(prevState.activeTab)
        .classList.remove("edit-profile-tab-active");
      document
        .getElementById(this.state.activeTab)
        .classList.add("edit-profile-tab-active");
    }
  }
  tabChange = (e) => {
    this.setState({ activeTab: e.target.id });
  };

  renderTabs = () => {
    switch (this.state.activeTab) {
      case "General":
        return <General user={this.props.user} setUser={this.props.setUser} />;
      case "Preference":
        return (
          <Preference user={this.props.user} setUser={this.props.setUser} />
        );
      case "Change Password":
        return <ChangePassword user={this.props.user} />;
      default:
        return <Error />;
    }
  };

  render() {
    return (
      <div className="page">
        <div className="edit-profile-tabbar">
          <div
            className="edit-profile-tab"
            id="General"
            onClick={(e) => this.tabChange(e)}
          >
            General
          </div>
          <div
            className="edit-profile-tab"
            id="Preference"
            onClick={(e) => this.tabChange(e)}
          >
            Preference
          </div>
          <div
            className="edit-profile-tab"
            id="Change Password"
            onClick={(e) => this.tabChange(e)}
          >
            Change Password
          </div>
        </div>
        <div className="tab">{this.renderTabs()}</div>
      </div>
    );
  }
}

export default EditProfile;
