import { combineReducers } from 'redux';

import user from './user';
import stats from './stats';
import certs from './certs';

const reducers = combineReducers({
  user,
  stats,
  certs
});

export default reducers;
