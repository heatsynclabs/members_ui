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

import { makeDuck, resetReducer } from 'cooldux';

import { get } from 'lodash';
import { apiFetch } from '../lib/fetch';

const duck = makeDuck({
  getAll: () => apiFetch('/events'), // browse
  read: (id) => apiFetch(`/events/${id}`),
  add: (body) => apiFetch('/events', { method: 'POST', body }),
  edit: (id, body) => apiFetch(`/events/${id}`, { method: 'PUT', body }),
});

export const { getAll, add, edit, read, initialStateCombined } = duck;

const reducer = resetReducer(initialStateCombined, (state = initialStateCombined, action) => {
  return duck.reducerCombined(state, action);
});

export default reducer;



// const {
//   // allHandler,
//   // oneHandler,
//   reducerCombined
// } = combinedHandler(['all','one'], 'events');

// export function read(event_id) {
//   return function dispatcher(dispatch, getState) {
//     const state = getState();
//     const token = get(state, 'user.auth.token', null);

//     const promise = apiFetch(`/events/${event_id}`, { headers: { Authorization: token } });
//     return oneHandler(promise, dispatch);
//   };
// }

// export function getAll() {
//   return function dispatcher(dispatch, getState) {
//     const state = getState();
//     const token = get(state, 'user.auth.token', null);

//     const promise = apiFetch('/events', { headers: { Authorization: token } });
//     return allHandler(promise, dispatch);
//   };
// }


export function formatDateRange(start_date, end_date) {
  var out = {
    start_date: new Date(start_date),
    start_date_string: "",
    start_time_string: "",
    end_date: new Date(end_date),
    end_date_string: "",
    end_time_string: "",
    full_date_string: ""
  };

  out.start_date_string = out.start_date.toLocaleDateString();
  out.start_time_string = out.start_date.toLocaleTimeString();
  out.end_date_string = out.end_date.toLocaleDateString();
  out.end_time_string = out.end_date.toLocaleTimeString();

  if (start_date != null) {
      out.full_date_string = out.start_date_string+" "+out.start_time_string;
  }

  if (end_date != null) {
    if (out.start_date_string === out.end_date_string && out.start_time_string === out.end_time_string) {
      out.full_date_string = out.start_date_string+" "+out.start_time_string;
    } else if (out.start_date_string === out.end_date_string) {
      out.full_date_string = out.start_date_string+" "+out.start_time_string+" - "+out.end_time_string;
    } else {
      out.full_date_string = out.start_date_string+" "+out.start_time_string+" - "+out.end_date_string+" "+out.end_time_string;
    }
  }

  return out;
}

// export default reducerCombined;
