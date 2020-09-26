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

import { combinedHandler, resetReducer, reset } from 'cooldux';
import { omit, get } from 'lodash';
import Joi from 'joi-browser';
import validator from './validator';
import { apiFetch } from '../lib/fetch';


const userSchema = {
  password: Joi.string().alphanum().min(8).max(10000).required(),
  confirmPassword: Joi.string().alphanum().min(8).max(10000).required(),
  email: Joi.string().email().required(),
};

const {
  verifyEnd, verifyHandler,
  tokenLoginEnd, tokenLoginHandler,
  logoutEnd, logoutHandler,
  validateHandler,
  signupHandler,
  newSignupsHandler,
  emailLoginHandler,
  allHandler,
  passwordResetHandler,
  initialStateCombined,
  oauthStartHandler,
  reducerCombined
} = combinedHandler(['verify', 'validate', 'signup', 'all', 'passwordReset', 'newSignups', 'oauthStart', 'tokenLogin', 'logout', 'emailLogin'], 'user');

const {
  authHandler,
  updatePasswordHandler,
  reducerCombined : combined2
} = combinedHandler(['auth', 'updatePassword'], { throwErrors: true, namespace: 'user' });


export function verify() {
  return dispatch => {
    const promise = apiFetch('/users/me');
    return verifyHandler(promise, dispatch);
  }
}

export function emailLogin(email) {
  return dispatch => {
    const promise = apiFetch('/users/email_login', {method: 'POST', body: {email}});
    return emailLoginHandler(promise, dispatch);
  }
}

export function oauthStart() {
  return dispatch => {
    const promise = apiFetch('/users/oauth_start');
    return oauthStartHandler(promise, dispatch);
  }
}

export function logout() {
  return dispatch => {
    const promise = apiFetch('/users/logout');
    dispatch(reset());
    return logoutHandler(promise, dispatch);
  }
}

export function tokenLogin(token) {
  return dispatch => {
    const promise = apiFetch('/users/oauth_token', {method: 'POST', body: {token}});
    return tokenLoginHandler(promise, dispatch);
  }
}

export function getNewSignups() {
  return function dispatcher(dispatch, getState) {
    const state = getState();
    const token = get(state, 'user.auth.token', null);

    const promise = apiFetch('/users/new_signups', { headers: { Authorization: token } });
    return newSignupsHandler(promise, dispatch);
  };
}

export function getAll() {
  return function dispatcher(dispatch, getState) {
    const state = getState();
    const token = get(state, 'user.auth.token', null);

    const promise = apiFetch('/users/all', { headers: { Authorization: token } });
    return allHandler(promise, dispatch);
  };
}

export function validate(token) {
  return dispatch => {
    const promise = apiFetch(`/users/validate/${token}`, {method: 'PUT'});
    return validateHandler(promise, dispatch);
  };
}

export function signup(newUser) {
  return dispatch => {
    const promise = new Promise((resolve, reject) => {
      const valid = validator(newUser, userSchema);
      if(valid.error){
        return reject(valid.error);
      }
      if(newUser.password !== newUser.confirmPassword){
        return reject(new Error(`passwords don't match`));
      }
      const options = {method: 'POST', body: omit(newUser, 'confirmPassword') };
      return resolve(apiFetch('/users', options));
    });

    return signupHandler(promise, dispatch);
  };
}

export function passwordReset(email) {
  return dispatch => {
    const promise = new Promise((resolve, reject) => {
      const valid = validator({email}, {email: userSchema.email});
      if(valid.error){
        return reject(valid.error);
      }
      const options = {method: 'POST', body: {email} };
      resolve(apiFetch('/users/reset', options));
    });
    return passwordResetHandler(promise, dispatch);
  };
}

export function updatePassword(token, password, confirmPassword) {
  return dispatch => {
    const promise = new Promise((resolve, reject) => {
      const valid = validator({password, confirmPassword}, {password: userSchema.password, confirmPassword: userSchema.confirmPassword});
      if(valid.error){
        return reject(valid.error);
      }
      if(password !== confirmPassword){
        return reject(new Error(`passwords don't match`));
      }
      const options = {method: 'PUT', body: { password, verify_password: confirmPassword } };
      resolve(apiFetch(`/users/reset/${token}`, options));
    });
    return updatePasswordHandler(promise, dispatch);
  };
}

export function auth(email, password) {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const valid = validator({email, password}, {email: Joi.string().email().required(), password: Joi.string().required()});
      if(valid.error){
        return reject(valid.error);
      }
      const options = {method: 'POST', body: { email, password } };
      resolve(apiFetch('/auth', options));
    });
    return authHandler(promise, dispatch);
  };
}

const reducer = resetReducer(initialStateCombined, function(state, action) {
  state = reducerCombined(state, action);
  state = combined2(state, action);

  switch (action.type) {
    case verifyEnd.type:
      return { ...state, auth: action.payload };
    case tokenLoginEnd.type:
      return { ...state, auth: action.payload };
    case logoutEnd.type:
      return { ...state, auth: null };
    default:
      return state;
  }
});

export default reducer;
