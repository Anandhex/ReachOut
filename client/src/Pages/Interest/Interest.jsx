import React, { Component } from "react";

import "./Interest.css";
import interests from "../../util/interest";
import ServerResponse from "../../Components/ServerResponse/ServerResponse";

export class Interest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      error: "",
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

  nextPage = () => {
    if (this.state.selected.filter((interest) => interest).length) {
      this.props.history.push("/profileUpdate");
    } else {
      this.setState(
        {
          error: {
            message: "Please select atleast 3 or more categories",
            messageType: "info",
          },
        },
        () => {
          setTimeout(() => this.setState({ error: "" }), 3000);
        }
      );
    }
  };

  render() {
    return (
      <div>
        {this.state.error ? <ServerResponse {...this.state.error} /> : ""}
        <div onClick={this.nextPage} className="Interest-arrow-next-page">
          <img
            src="https://img.icons8.com/plasticine/100/000000/arrow.png"
            alt="arrow"
          />
        </div>
        <div className="Interest-select-item-heading-container">
          <div className="Interest-select-item-heading">
            Select your responses
          </div>
          <div className="Interest-select-item-sub-heading">
            You should atleast select 3
          </div>
        </div>
        <div className="Interest-select-item-container">
          {interests.map((interest, idx) => (
            <div
              className={`Interest-select-item ${
                this.state.selected[idx] ? "Interest-select-item-selected" : ""
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
      </div>
    );
  }
}

export default Interest;
