import React from "react";
import Store from "./store";
import "/Users/Kenswed/node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/Users/Kenswed/node_modules/bootstrap/dist/js/bootstrap.bundle";
import Navbar from "./Components/Layout/Navbar";
import Register from "./Components/Register";
import Signin from "./Components/Login";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import AddPost from "./Components/Add__Post";
import Posts from "./Components/Posts";
import { loadUser } from "./Action/Auth";
import { useEffect } from "react";
import EditPost from "./Components/Editpost";
import PostComponent from "./Components/postComponent";
import Profile from "./Components/Profile";
import Editprofile from "./Components/Editprofile";
import Spinner from "./Components/Layout/spinner";
const Routing = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  });

  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <Spinner />
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/read/more/:id" exact component={PostComponent} />
          <Route path="/" exact component={Posts} />
          <Route path="/login" exact component={Signin} />
          <Route path="/edit/profile/:id" exact component={Editprofile} />
          <PrivateRoute path="/new/post" exact component={AddPost} />
          <PrivateRoute path="/Edit/post/:id" exact component={EditPost} />
          <PrivateRoute path="/profile/read/:id" exact component={Profile} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default Routing;
