import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import FormikLoginForm from "./components/login/loginForm";
import Design from "./components/design";

function App() {
  return (
    <div className="App">
      Hello from App
      <Router>
        <Route exact path="/" component={FormikLoginForm} />
        <PrivateRoute exact path="/design" component={Design} />
      </Router>
    </div>
  );
}

// sensitve console logs to take out
// login x 2
//login form/formik x 2

export default App;
