import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "./components/nav/Navigation";
import Registration from "./components/auth/Registration";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import LandingPage from "./components/main/LandingPage";
import Admin from "./components/admin/Admin";
import Center from "./components/admin/center/Center";
import UserAdmin from "./components/admin/user/UserAdmin";
import ViewUser from "./components/admin/user/ViewUser";
import ShowCenter from "./components/admin/center/ShowCenter";
import ShowRoom from "./components/admin/room/ShowRoom";
import Appointment from "./components/appointment/Appointment";
import UserRoster from "./components/admin/user/UserRoster";

import axios from "axios";

function App() {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    //This function is to check if a user has logged in..
    async function setUserStats() {
      try {
        let {
          data: { user },
        } = await axios.get("/api/auth/user", {
          headers: {
            authorization: `Bearer ${localStorage.token}`,
          },
        });

        await setAuth(true);
        await setUser(user);
      } catch (e) {
        await setAuth(false);
        await setUser(null);
        localStorage.removeItem("token");
      }
    }
    setUserStats();
  }, [auth]);


  function logout() {
    setAuth(false);
    setUser(null);
    localStorage.removeItem("token");
  }

  return (
    <BrowserRouter>
      <Navigation auth={auth} user={user} logout={logout} />

      <Switch>
        <Route path="/" exact>
          <LandingPage auth={auth} user={user} />
        </Route>

        <Route path="/login">
          <Login setAuth={setAuth} setUser={setUser} />
        </Route>

        <Route path="/register">
          <Registration setAuth={setAuth} setUser={setUser} />
        </Route>

        <Route path="/bookAppt">
          <Appointment user={user} setUser={setUser} />
        </Route> 
   
        <PrivateRouter
          auth={auth}
          path="/profile"
          Component={Profile}
          setAuth={setAuth}
          user={user}
          setUser={setUser}
          exact
        />

        {/* <PrivateRouter
          auth={auth}     
          path="/bookAppt"     
          Component={Appointment}          
          user={user} 
          setUser={setUser}
          exact
        /> */}

        <PrivateRouter
          auth={auth}
          path="/admin/center"
          Component={Center}
          exact
        />

        <PrivateRouter
          auth={auth}
          path="/admin/showcenter/:centerID"
          Component={ShowCenter}
        />

        <PrivateRouter
          auth={auth}
          path="/admin/showroom/:roomID"
          Component={ShowRoom}
        />

        <PrivateRouter
          auth={auth}
          path="/admin/user/:userID"
          Component={ViewUser}
        />

        <PrivateRouter
          auth={auth}
          path="/admin/user"
          Component={UserAdmin}
        />

        <PrivateRouter
          auth={auth}
          path="/roster"
          Component={UserRoster}
          user={user} 
          setUser={setUser}
        />

        <PrivateRouter
          auth={auth}
          path="/admin"
          Component={Admin}
          user={user}
          setUser={setUser}
          exact
        />

        <Route path="*">404 Page not found</Route>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRouter({ auth, Component, path, location, ...rest }) {
  //if auth is true then show Route else redirect to login
  return (
    <>

      {auth ? (
        <Route path={path}>
          <Component {...rest} />
        </Route>
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location },
          }}
        />
      )}
    </>
  );
}

export default App;
