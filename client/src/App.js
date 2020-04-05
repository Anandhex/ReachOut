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
import jwt from "./util/jwt";
import axios from "axios";
import { API_BASE_URL } from "./util/apiUtil";
import Me from "./Pages/Me/Me";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      jwt: null,
    };
  }
  componentDidMount() {
    if (jwt.getJWT()) {
      let api = API_BASE_URL + "users/";
      axios.get(`${api}/${jwt.getId()}`).then((resp) => {
        this.setState({ user: resp.data.data.user });
        jwt.setBoarded(resp.data.data.user.isBoarded);
      });
    }
  }

  setJWTToken = (jwt) => {
    this.setState({ jwt });
  };
  setUser = (user) => {
    this.setState({ user });
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
          <Route
            exact
            path="/profileUpdate"
            render={(routeParams) => (
              <ProfileUpdate setUser={this.setUser} {...routeParams} />
            )}
          />
          <Route
            exact
            path="/me"
            render={(routeParams) => (
              <Me user={this.state.user} {...routeParams} />
            )}
          />
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
