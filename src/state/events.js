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

import { apiFetch } from '../lib/fetch';

const duck = makeDuck({
  getAll: () => apiFetch('/events'), // browse
  getOne: (id) => {
    return apiFetch(`/events/${id}`);
  },
  add: (body) => apiFetch('/events', { method: 'POST', body }),
  edit: (id, body) => apiFetch(`/events/${id}`, { method: 'PUT', body }),
});

export const {
  getAll, add, edit, getOne, initialStateCombined,
} = duck;

// eslint-disable-next-line default-param-last
const reducer = resetReducer(initialStateCombined, (state = initialStateCombined, action) => {
  return duck.reducerCombined(state, action);
});

export default reducer;

export function formatDateRange(event) {
  const out = {
    start_date: new Date(event.start_date),
    start_date_string: '',
    start_time_string: '',
    end_date: new Date(event.end_date),
    end_date_string: '',
    end_time_string: '',
    full_date_string: '',
  };

  out.start_date_string = out.start_date.toLocaleDateString();
  out.start_time_string = out.start_date.toLocaleTimeString();
  out.end_date_string = out.end_date.toLocaleDateString();
  out.end_time_string = out.end_date.toLocaleTimeString();

  if (event.start_date != null) {
    out.full_date_string = out.start_date_string + ' ' + out.start_time_string;
  }

  if (event.end_date != null) {
    if (out.start_date_string === out.end_date_string && out.start_time_string === out.end_time_string) {
      out.full_date_string = out.start_date_string + ' ' + out.start_time_string;
    } else if (out.start_date_string === out.end_date_string) {
      out.full_date_string = out.start_date_string + ' ' + out.start_time_string + ' - ' + out.end_time_string;
    } else {
      // eslint-disable-next-line max-len
      out.full_date_string = out.start_date_string + ' ' + out.start_time_string + ' - ' + out.end_date_string + ' ' + out.end_time_string;
    }
  }

  return out;
}
