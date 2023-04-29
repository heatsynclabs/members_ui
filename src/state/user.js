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

import {
  combinedHandler, resetReducer, reset, makeDuck,
} from 'cooldux';
import { omit, includes } from 'lodash';
import Joi from 'joi';
import validator from './validator';
import { apiFetch } from '../lib/fetch';

const userSchema = {
  password: Joi.string().alphanum().min(8).max(10000)
    .required(),
  confirmPassword: Joi.string().alphanum().min(8).max(10000)
    .required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
};

const duck = makeDuck({
  getAll: (query) => apiFetch('/users/all', { query }),
  getOne: (id) => apiFetch(`/users/all/${id}`),
  emailLogin: (email) => apiFetch('/users/email_login', { method: 'POST', body: { email } }),
  oauthStart: () => apiFetch('/users/oauth_start'),
  getNewSignups: () => apiFetch('/users/new_signups'),
  verify: () => apiFetch('/users/me'),
  tokenLogin: (token) => apiFetch('/users/oauth_token', { method: 'POST', body: { token } }),
  validate: (token) => apiFetch(`/users/validate/${token}`, { method: 'PUT' }),
  signup: (newUser) => {
    return new Promise((resolve, reject) => {
      const valid = validator(newUser, userSchema);
      if (valid.error) {
        reject(valid.error);
        return;
      }
      if (newUser.password !== newUser.confirmPassword) {
        reject(new Error('passwords don\'t match'));
        return;
      }
      const options = { method: 'POST', body: omit(newUser, 'confirmPassword') };
      resolve(apiFetch('/users', options));
    });
  },
  passwordReset: (email) => {
    return new Promise((resolve, reject) => {
      const valid = validator({ email }, { email: userSchema.email });
      if (valid.error) {
        reject(valid.error);
        return;
      }
      const options = { method: 'POST', body: { email } };
      resolve(apiFetch('/users/reset', options));
    });
  },
  updatePassword: (token, password, confirmPassword) => {
    return new Promise((resolve, reject) => {
      const valid = validator(
        { password, confirmPassword },
        {
          password: userSchema.password,
          confirmPassword: userSchema.confirmPassword,
        },
      );
      if (valid.error) {
        reject(valid.error);
        return;
      }
      if (password !== confirmPassword) {
        reject(new Error('passwords don\'t match'));
        return;
      }
      const options = { method: 'PUT', body: { password, verify_password: confirmPassword } };
      resolve(apiFetch(`/users/reset/${token}`, options));
    });
  },

});

export const {
  getAll,
  getOne,
  emailLogin,
  oauthStart,
  getNewSignups,
  verify,
  tokenLogin,
  validate,
  signup,
  passwordReset,
  updatePassword,
  reducerCombined,
  initialStateCombined,
} = duck;
const { verifyEnd, tokenLoginEnd } = duck;

const {
  authHandler, authEnd,
  logoutEnd, logoutHandler,
  initialStateCombined: isc2,
  reducerCombined: combined2,
} = combinedHandler(['auth', 'logout'], { throwErrors: true, namespace: 'user' });

export function logout() {
  return (dispatch) => {
    const promise = apiFetch('/users/logout');
    dispatch(reset());
    return logoutHandler(promise, dispatch);
  };
}

export function auth(email, password) {
  return (dispatch) => {
    const promise = new Promise((resolve, reject) => {
      const valid = validator(
        { email, password },
        {
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        },
      );
      if (valid.error) {
        reject(valid.error);
        return;
      }
      const options = { method: 'POST', body: { email, password } };
      resolve(apiFetch('/auth', options));
    });
    return authHandler(promise, dispatch);
  };
}

function setAdmin(payload) {
  if (includes(payload.scope, 'ADMIN')) {
    payload.isAdmin = true;
  }
  return payload;
}

const reducer = resetReducer({ ...initialStateCombined, ...isc2 }, (state, action) => {
  state = reducerCombined(state, action);
  state = combined2(state, action);
  switch (action.type) {
    case authEnd.type:
      return { ...state, auth: setAdmin(action.payload) };
    case verifyEnd.type:
      return { ...state, auth: setAdmin(action.payload) };
    case tokenLoginEnd.type:
      return { ...state, auth: setAdmin(action.payload) };
    case logoutEnd.type:
      return { ...state, auth: null };
    default:
      return state;
  }
});

export default reducer;
