import React, { useContext } from "react";
import {Link, NavLink, Redirect, Route, Switch, useRouteMatch} from "react-router-dom";
import AuthContext from "../AuthContext.js";
import Stats from "./Stats.jsx";
import Play from "./Play.jsx";
import History from "./History.jsx";

const Menu = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { path, url } = useRouteMatch();

  if (!isLoggedIn) return <Redirect to="/sign-in" />;

  return (
      <>
        <nav>
          <ul>
            <li>
              <NavLink  to={`${url}/stats`} activeClassName="active" >STATS</NavLink>
            </li>
            <li>
              <NavLink  to={`${url}/play`} activeClassName="active" >NEW GAME</NavLink>
            </li>
            <li>
              <NavLink  to={`${url}/history`} activeClassName="active" >PAST GAMES</NavLink>
            </li>
          </ul>
        </nav>


        <Switch>
          <Route exact path="/">
            <h2>Welcome, {user.name}</h2>
          </Route>

          <Route path={`${path}/stats`}>
            <Stats />
          </Route>

          <Route path={`${path}/play`}>
            <Play />
          </Route>

          <Route path={`${path}/history`}>
            <History />
          </Route>
        </Switch>
      </>
  );
};

export default Menu;