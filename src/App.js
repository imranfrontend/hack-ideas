import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login/Login';
import Challenges from './pages/Challenges';

const App = () => {
  return (
    <Router>
      <div className="app-wrapper">
        <Switch>
          <Route exact path='/' component={Login} />
          <ProtectedRoute exact path='/challenges' component={Challenges} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
