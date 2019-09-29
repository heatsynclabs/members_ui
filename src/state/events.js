import { combinedHandler } from 'cooldux';

import { omit, get } from 'lodash';
import { apiFetch } from '../lib/fetch';
import { getAuthOptions } from './util';

const {
  allHandler,
  initialStateCombined,
  reducerCombined
} = combinedHandler(['all'], 'events');

export function getAll() {
  return function dispatcher(dispatch, getState) {
    const state = getState();
    const token = get(state, 'user.auth.token', null);

    const promise = apiFetch('/events', { headers: { Authorization: token } });
    return allHandler(promise, dispatch);
  };
}

export default reducerCombined;
