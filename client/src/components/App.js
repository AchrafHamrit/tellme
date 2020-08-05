import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// App layout components
import Navbar from './layout/Navbar';

// App pages
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
