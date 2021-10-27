import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import './index.less';
import ExercisePage from './components/exercise';
export default function App() {
  return (
    <Router>
      <Route exect path="/courses/:courseId/exercises/:exerciseId">
        <ExercisePage />
      </Route>
    </Router>
  );
}
