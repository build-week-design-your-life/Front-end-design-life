import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import FormikRegistrationForm from "./components/login/registrationForm";
import Design from "./components/design/design";
import PrivateRoute from "./components/security/PrivateRoute"
import FormikLoginForm from "./components/login/loginForm";

function App() {
  return (
    <div className="App">
      Hello from App
      <Router>
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
