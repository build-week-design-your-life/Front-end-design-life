import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import FormikRegistrationForm from "./components/login/registrationForm";
import Design from "./components/design/design";
import PrivateRoute from "./components/security/PrivateRoute";
import FormikLoginForm from "./components/login/loginForm";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="navLinks">
          <Link
            to="https://design-your-life-home.netlify.com/"
            className="navLink"
          >
            Home Page
          </Link>
          <Link to="/" className="navLink">
            Registration
          </Link>
          <Link to="/login" className="navLink">
            Login
          </Link>
          <Link to="/design" className="navLink">
            Your Journal Entries
          </Link>
          {/* <button onClick={()=>{localStorage.removeItem("token")} }>Log out</button> */}
          {/* Log out button, not MVP so just tinkering with it */}
        </div>
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
// new post form
//update form

export default App;
