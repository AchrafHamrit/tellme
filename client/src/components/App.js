import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// App layout components
import Navbar from './layout/Navbar';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Switch>
          <Route path='' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
