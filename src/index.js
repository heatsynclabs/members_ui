
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { MuiThemeProvider } from '@material-ui/core/styles';

import reducers from './state';

import PrivateRoute from './components/private-route';

import ConnectedHome from './pages/home';
import ConnectedApp from './pages/app';
import ConnectedUsers from './pages/users';
import ConnectedSignup from './pages/signup';
import ConnectedValidate from './pages/validate';
import ConnectedLogin from './pages/login';
import ConnectedForgot from './pages/forgot';
import ConnectedUpdatePassword from './pages/updatepassword';

import { verify } from './state/user';
import './index.css';
import theme from './theme';


const store = createStore(reducers, applyMiddleware(thunkMiddleware));

store.dispatch(verify());

render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={ConnectedHome} />
        <PrivateRoute path="/app" component={ConnectedApp} />
        <PrivateRoute path="/users" component={ConnectedUsers} />
        <Route path="/login" component={ConnectedLogin} />
        <Route path="/signup" component={ConnectedSignup} />
        <Route path="/validate/:token" component={ConnectedValidate} />
        <Route path="/reset/:token" component={ConnectedUpdatePassword} />
        <Route path="/forgot" component={ConnectedForgot} />
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
