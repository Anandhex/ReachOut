import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Error from "./Pages/Error/Error";
import SignUp from "./Pages/SignUp/SignUp";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  render() {
    return (
      <>
        <NavBar user={this.state.user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/signup"
            component={() => <SignUp isSignIn={true} />}
          />
          <Route
            exact
            path="/login"
            component={() => <SignUp isSignIn={false} />}
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

export default App;
