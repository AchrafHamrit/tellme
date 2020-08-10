import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

// Redux store
import store from '../redux/store';

// App layout components
import Navbar from './layout/Navbar';
import Alert from './layout/Alert';

// App pages
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Messages from './pages/Messages';
import Settings from './pages/Settings';

// Routes
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className='app'>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/u/:username' component={Profile} />
            <PrivateRoute exact path='/messages' component={Messages} />
            <PrivateRoute exact path='/settings' component={Settings} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
