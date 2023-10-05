import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Details from "../pages/createUser";
import { NotFound } from "./notfound";
import { ROOT, DETAILS, LOGIN, SIGNUP, PROFILE, CREATE, EDIT } from "./constants";
import Login from "./auth/login";
import Signup from "./auth/register";
import Profile from "../pages/profile/profile";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CreateUser from "../pages/createUser";
import EditUser from "../pages/editUser";

export const RouterConfig = () => {
  return (
    <>
    <div className="body">
      <Navbar/>
      <Switch>
          {/* List all public routes */}
          <Route exact path={ROOT} render={() => <Home/>} />
          <Route exact path={DETAILS} render={() => <Details/>} />
          <Route exact path={LOGIN} render={() => <Login/>} />
          <Route exact path={SIGNUP} render={() => <Signup/>} />
          <Route exact path={CREATE} render={() => <CreateUser/>} />
          <Route exact path={EDIT} render={() => <EditUser/>} />
          <Route exact path={PROFILE} render={() => <Profile/>} />
          {/* List a generic 404-Not Found route here */}
          <Route path="*" render={() => <NotFound/>}/>
        </Switch>
      <Footer/>
      </div>
    </>
  );
};
