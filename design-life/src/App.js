import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import "./App.css";
import FormikRegistrationForm from "./components/login/registrationForm";
import Design from "./components/design/design";
import PrivateRoute from "./components/security/PrivateRoute";
import FormikLoginForm from "./components/login/loginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Link
          to="https://design-your-life-home.netlify.com/"
          className="navLinks"
        >
          Home Page
        </Link>
        <Link to="/design" className="navLinks">
          Your Journal Entries
        </Link>
        <Link to="/" className="navLinks">
          Registration
        </Link>
        <Link to="/login" className="navLinks">
          Login
        </Link>
        <Route exact path="/" component={FormikRegistrationForm} />
        <Route exact path="/login" component={FormikLoginForm} />
        <PrivateRoute exact path="/design" component={Design} />
      </Router>
    </div>
  );
}

// sensitve console logs to take out
// login x 2
//login form/formik x 2

export default App;
