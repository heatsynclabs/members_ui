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

// @ts-ignore
import { promiseMiddleware } from 'cooldux';
import {
  combineReducers, applyMiddleware, createStore, compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';

import cards from './cards';
import certs from './certs';
import events from './events';
import stats from './stats';
import user, { verify } from './user';
import userCerts from './userCerts';

const reducers = combineReducers({
  cards,
  certs,
  events,
  stats,
  user,
  userCerts,
});

export default reducers;

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware, promiseMiddleware)));

store.dispatch(verify());
