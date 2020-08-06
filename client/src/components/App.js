import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// App layout components
import Navbar from './layout/Navbar';
import Alert from './layout/Alert';

// App pages
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <div className='app'>
        <Navbar />
        <Alert />
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
