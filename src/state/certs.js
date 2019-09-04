import { combinedHandler } from 'cooldux';

import { apiFetch } from '../lib/fetch';
import { getAuthOptions } from './util';

const {
  certsHandler,
  userCertsHandler,
  initialStateCombined,
  reducerCombined
} = combinedHandler(['certs', 'userCerts'], 'certs');


export function fetchStats() {
  return function dispatcher(dispatch, getState) {
    const promise = apiFetch('/certs', getAuthOptions(getState));
    return certsHandler(promise, dispatch);
  };
}

export default reducerCombined;
