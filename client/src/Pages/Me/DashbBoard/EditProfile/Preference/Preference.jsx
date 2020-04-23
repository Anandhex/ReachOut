import React, { Component } from "react";
import "./Preference.css";
import ServerResponse from "../../../../../Components/ServerResponse/ServerResponse";
import Loader from "../../../../../Components/Loader/Loader";
import interests from "../../../../../util/interest";
import { API_BASE_URL } from "../../../../../util/apiUtil";
import jwt from "../../../../../util/jwt";
import axios from "axios";
import { toast } from "react-toastify";

export class Preference extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: null,
      selected:
        this.props.user && this.props.user.areaOfInterest
          ? this.props.user.areaOfInterest
          : ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
    };
  }
  interestClicked = (idx) => {
    if (this.state.selected[idx]) {
      this.setState({
        selected: this.state.selected.map((interest, id) =>
          id === idx ? "" : interest
        ),
      });
    } else {
      let selected = this.state.selected;
      selected[idx] = interests[idx];
      this.setState({ selected });
    }
  };
  handleClick = async () => {
    const { selected } = this.state;
    if (
      this.state.selected &&
      this.state.selected.filter((select) => select).length > 3
    ) {
      this.setState({ isLoading: true });
      let api = API_BASE_URL + `users/${jwt.getId()}`;
      let body = {
        areaOfInterest: selected,
      };
      const headers = jwt.getAuthHeader();
      try {
        const resp = await axios.patch(api, body, { headers });
        this.props.setUser(resp.data.data.user);
        toast.info("Updated interests");
      } catch (err) {
        console.log(err);
        if (!err.response) {
          toast.error("Something went wrong!");
        } else {
          toast.error(err.response.data.message);
        }
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      toast.error("Selected interests should be greater than 3");
      this.setState({ isLoading: false });
    }
  };
  render() {
    return (
      <>
        {this.state.error ? <ServerResponse {...this.state.error} /> : ""}
        {this.state.isLoading ? <Loader /> : ""}
        <div className="Preference-container">
          <div className="Interest-select-item-heading-container">
            <div className="Interest-select-item-heading">
              Update your interests
            </div>
            {this.state.selected.filter((select) => select).length > 3 ? (
              ""
            ) : (
              <div className="Interest-select-item-sub-heading">
                You should atleast select 3
              </div>
            )}
          </div>
          <div className="Interest-select-item-container">
            {interests.map((interest, idx) => (
              <div
                key={interest}
                className={`Interest-select-item ${
                  this.state.selected[idx]
                    ? "Interest-select-item-selected"
                    : ""
                }`}
                onClick={() => this.interestClicked(idx)}
              >
                <img
                  className="Interest-select-item-img"
                  src={`/images/interest/${interest}.png`}
                  alt={interest}
                />
                <p>{interest}</p>
              </div>
            ))}
          </div>
          <div className="btn-update-container">
            <div className="SignUp-form-button">
              <input type="button" value="Update" onClick={this.handleClick} />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Preference;
