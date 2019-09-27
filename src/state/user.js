import { combinedHandler, resetReducer, reset } from 'cooldux';
import PouchDB from 'pouchdb';
import PouchUpsert from 'pouchdb-upsert';
import { omit, get } from 'lodash';
import Joi from 'joi-browser';
import validator from './validator';
import { apiFetch } from '../lib/fetch';

PouchDB.plugin(PouchUpsert);
let db = new PouchDB('user');

const userSchema = {
  password: Joi.string().alphanum().min(8).max(10000).required(),
  confirmPassword: Joi.string().alphanum().min(8).max(10000).required(),
  email: Joi.string().email().required(),
};



const {
  verifyEnd, verifyHandler,
  validateHandler,
  signupHandler,
  newSignupsHandler,
  allHandler,
  passwordResetHandler,
  initialStateCombined,
  reducerCombined
} = combinedHandler(['verify', 'validate', 'signup', 'all', 'passwordReset', 'newSignups'], 'user');

const {
  authHandler,
  updatePasswordHandler,
  reducerCombined : combined2
} = combinedHandler(['auth', 'updatePassword'], { throwErrors: true, namespace: 'user' });


export function verify() {
  return dispatch => {
    let token;
    const promise = db.get('me')
      .then((me) =>{
        token = me.token;
        return apiFetch('/users/me', {
          headers: { Authorization: me.token }
        });
      })
      .then(auth => {
        auth.token = token;
        return auth;
      });
    return verifyHandler(promise, dispatch);
  };
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
      resolve(apiFetch('/auth', options)
        .then((auth) => {
            console.log('autedh', auth);
            return db.upsert('me', (doc) => {
              doc.token = auth.token;
              return doc;
            }).then(() => auth);
        }));
    });
    return authHandler(promise, dispatch);
  };
}

export function logout() {
  return (dispatch) => {
    return db.destroy().then(() => {
      db = new PouchDB('user');
      dispatch(reset());
    });
  };
}

const reducer = resetReducer(initialStateCombined, function(state, action) {
  state = reducerCombined(state, action);
  state = combined2(state, action);

  switch (action.type) {
    case verifyEnd.type:
      return { ...state, auth: action.payload };
    default:
      return state;
  }
});

export default reducer;
