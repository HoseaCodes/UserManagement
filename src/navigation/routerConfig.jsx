import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import Details from "../pages/createUser";
import NotFound2 from "./notFound2";
import { ROOT, DETAILS, LOGIN, SIGNUP, PROFILE, 
  CREATE, EDIT, ALL, ADD, EDIT2 } from "./constants";
import Login from "./auth/login";
import Signup from "./auth/register";
import Profile from "../pages/profile/profile";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import CreateUser from "../pages/createUser";
import EditUser from "../pages/editUser";
import AllUsers from "../pages/crud/allUsers";
import AddUser from "../pages/crud/addUser";
import EditAUser from "../pages/crud/editaUser";

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
          <Route exact path={ALL} render={() => <AllUsers /> } />
          <Route exact path={ADD} render={() => <AddUser />} />
          <Route exact path={EDIT2} render={() => <EditAUser />} />
          {/* List a generic 404-Not Found route here */}
          <Route path="*" render={() => <NotFound2/>}/>
        </Switch>
      <Footer/>
      </div>
    </>
  );
};
