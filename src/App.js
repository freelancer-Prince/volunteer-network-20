import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './commponent/Home/Home';
import Header from './commponent/Header/Header';
import SignInAndSignUp from './commponent/SignIn&SignUp/SignInAndSignUp';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <>
    <UserContext.Provider value = {[loggedInUser, setLoggedInUser]}>
     <h1>email:{loggedInUser.email}</h1> 
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signinandsignup">
            <SignInAndSignUp />
          </Route>
        </Switch>
      </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
