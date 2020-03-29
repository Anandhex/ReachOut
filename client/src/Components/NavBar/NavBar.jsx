import React, { Component } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
export class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar-nav-container">
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
            <NavLink
              to="/logout"
              exact
              activeClassName="NavBar-nav-link-active"
            >
              Logout
            </NavLink>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
