import { promiseHandler } from 'cooldux';
import { get } from 'lodash';

import { apiFetch } from '../lib/fetch';

const { statsHandler, statsReducer } = promiseHandler('stats');

export function fetchStats() {
  return function dispatcher(dispatch, getState) {
    const state = getState();
    const token = get(state, 'user.auth.token', null);
    const promise = apiFetch('/stats', { headers: { Authorization: token } });
    return statsHandler(promise, dispatch);
  };
}

export default statsReducer;
