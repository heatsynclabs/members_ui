import { combineReducers } from 'redux';

import user from './user';
import stats from './stats';
import certs from './certs';
import events from './events';

const reducers = combineReducers({
  user,
  stats,
  certs,
  events
});

export default reducers;
