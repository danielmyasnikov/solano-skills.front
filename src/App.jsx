import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import './index.less';
import ExercisePage from './components/exercise';
export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses/python-for-beginners/exercises/1">Courses</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
          <Route exect path="/courses/:courseId/exercises/:exerciseId">
            <ExercisePage />
          </Route>
          <Route exect path="/users">
            <h1>Users</h1>
          </Route>
          <Route exect path="/">
            <h1>Main</h1>
          </Route>
      </div>
    </Router>
  );
}
