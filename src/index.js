// Copyright 2019 Iced Development, LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { promiseMiddleware } from 'cooldux';
import { MuiThemeProvider } from '@material-ui/core/styles';

import reducers from './state';

import PrivateRoute from './components/private-route';

import Home from './pages/home';
import App from './pages/app';
import Users from './pages/users';
import UserDetails from './pages/user_details';
import Signup from './pages/signup';
import Validate from './pages/validate';
import Login from './pages/login';
import Forgot from './pages/forgot';
import UpdatePassword from './pages/updatepassword';
import Events from './pages/events';
import Event from './pages/event';
import Certs from './pages/certs';
import CertDetails from './pages/cert_details';

import { verify } from './state/user';
import './index.css';
import theme from './theme';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, promiseMiddleware)));

store.dispatch(verify());

render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <Route exact path="/" component={Home} />

        <PrivateRoute path="/app" component={App} />
        <PrivateRoute exact path="/users" component={Users} />
        <PrivateRoute exact path="/users/:id" component={UserDetails} />
        <PrivateRoute exact path="/events" component={Events} />
        <PrivateRoute exact path="/events/:event_id" component={Event} />
        <PrivateRoute exact path="/certs" component={Certs} />
        <PrivateRoute exact path="/certs/:id" component={CertDetails} />

        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/validate/:token" component={Validate} />
        <Route path="/reset/:token" component={UpdatePassword} />
        <Route path="/login/:token" component={Login} />
        <Route path="/forgot" component={Forgot} />
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));
