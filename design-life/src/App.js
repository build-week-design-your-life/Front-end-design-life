import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';
import Login from "./components/login/loginForm"

function App() {
  return (
    <div className="App">
      Hello from App
      <Router>
        <Route exact path="/" component={FormikLoginForm} />
        <PrivateRoute exact path="/design" component={design} />
      </Router>
    </div>
  );
}

// sensitve console logs to take out
 // login
 //login form/formik

export default App;
