import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      Hello from App
      <Router>
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/design" component={design} />
      </Router>
    </div>
  );
}

export default App;
