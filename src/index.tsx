import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// @ts-ignore
import { promiseMiddleware } from 'cooldux';
import { ThemeProvider } from '@mui/material/styles';

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
import AuthWrapper from './components/auth-wrapper';

// @ts-ignore
const composeEnhancers = window.__REX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, promiseMiddleware)));

const Router = HashRouter;

store.dispatch(verify());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

debugger;

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
		<Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/validate/:token" element={<Validate />} />
        <Route path="/reset/:token" element={<UpdatePassword />} />
        <Route path="/login/:token" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />

          <Route path="/app" element={<AuthWrapper><App /></AuthWrapper>} />
          <Route path="/users" element={<AuthWrapper><Users /></AuthWrapper>} />
          <Route path="/users/:id" element={<AuthWrapper><UserDetails /></AuthWrapper>} />
          <Route path="/events" element={<AuthWrapper><Events /></AuthWrapper>} />
          <Route path="/events/:event_id" element={<AuthWrapper><Event /></AuthWrapper>} />
          <Route path="/certs" element={<AuthWrapper><Certs /></AuthWrapper>}/>
          <Route path="/certs/:id" element={<AuthWrapper><CertDetails /></AuthWrapper>} />
		</Routes>
      </Router>
    </ThemeProvider>
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
