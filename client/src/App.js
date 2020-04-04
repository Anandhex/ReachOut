import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Error from "./Pages/Error/Error";
import SignUp from "./Pages/SignUp/SignUp";
import Logout from "./Pages/Logout/Logout";
import Interest from "./Pages/Interest/Interest";
import ProfileUpdate from "./Pages/ProfileUpdate/ProfileUpdate";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      jwt: null,
    };
  }

  setJWTToken = (jwt) => {
    console.log(jwt);
    this.setState({ jwt });
  };
  setUser = (user) => {
    console.log(user);
    this.setState({ user });
  };

  isAuthenticated = () => {
    return this.state.user && this.state.jwt;
  };
  handleLogout = () => {
    this.setState({ user: null, jwt: null });
  };
  logout = () => {
    this.setState({ user: null });
  };
  render() {
    return (
      <>
        <NavBar user={this.state.user} logout={this.handleLogout} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signup"
            render={() => (
              <SignUp
                isSignIn={true}
                setJWTToken={this.setJWTToken}
                setUser={this.setUser}
                isAuthenticated={this.isAuthenticated}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(routeParams) => (
              <SignUp
                isSignIn={false}
                setJWTToken={this.setJWTToken}
                setUser={this.setUser}
                isAuthenticated={this.isAuthenticated}
                {...routeParams}
              />
            )}
          />
          <Route
            exact
            path="/logout"
            render={(routeParams) => (
              <Logout logout={this.logout} {...routeParams} />
            )}
          />
          <Route exact path="/selectInterst" component={Interest} />
          <Route exact path="/profileUpdate" component={ProfileUpdate} />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </>
    );
  }
}

export default withRouter(App);
