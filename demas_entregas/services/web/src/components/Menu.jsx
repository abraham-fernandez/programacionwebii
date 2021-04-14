import React, { useContext } from "react";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import AuthContext from "../AuthContext.js";
import Stats from "./Stats.jsx";
import Play from "./Play.jsx";
import History from "./History.jsx";
import styles from './menu.css'

const Menu = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const { path, url } = useRouteMatch();
  const changeState=()=>{

    sessionStorage.removeItem('state')
  }

  if (!isLoggedIn) return <Redirect to="/sign-in" />;

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to={`${url}/stats`}>Stats</Link>
          </li>
          <li>
            <Link to={`${url}/play`} onClick={changeState}>New game</Link>
          </li>
          <li>
            <Link to={`${url}/history`}>Past games</Link>
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
