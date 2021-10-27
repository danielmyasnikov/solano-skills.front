import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import './index.less';
import ExercisePage from './components/exercise';
export default function App() {
  return (
    <Router>
        <Switch>
          <Route path="/courses/:courseId/exercises/:exerciseId">
            <ExercisePage />
          </Route>
        </Switch>
    </Router>
  );
}
