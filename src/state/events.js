import { combinedHandler } from 'cooldux';

import { omit, get } from 'lodash';
import { apiFetch } from '../lib/fetch';
import { getAuthOptions } from './util';

const {
  allHandler,
  oneHandler,
  initialStateCombined,
  reducerCombined
} = combinedHandler(['all','one'], 'events');

export function getOne(event_id) {
  return function dispatcher(dispatch, getState) {
    const state = getState();
    const token = get(state, 'user.auth.token', null);

    const promise = apiFetch(`/events/${event_id}`, { headers: { Authorization: token } });
    return oneHandler(promise, dispatch);
  };
}

export function getAll() {
  return function dispatcher(dispatch, getState) {
    const state = getState();
    const token = get(state, 'user.auth.token', null);

    const promise = apiFetch('/events', { headers: { Authorization: token } });
    return allHandler(promise, dispatch);
  };
}


export function formatDateRange(event) {
  var out = {
    start_date: new Date(event.start_date),
    start_date_string: "",
    start_time_string: "",
    end_date: new Date(event.end_date),
    end_date_string: "",
    end_time_string: "",
    full_date_string: ""
  };

  out.start_date_string = out.start_date.toLocaleDateString();
  out.start_time_string = out.start_date.toLocaleTimeString();
  out.end_date_string = out.end_date.toLocaleDateString();
  out.end_time_string = out.end_date.toLocaleTimeString();

  if (event.start_date != null) {
      out.full_date_string = out.start_date_string+" "+out.start_time_string;
  }

  if (event.end_date != null) {
    if (out.start_date_string == out.end_date_string && out.start_time_string == out.end_time_string) {
      out.full_date_string = out.start_date_string+" "+out.start_time_string;
    } else if (out.start_date_string == out.end_date_string) {
      out.full_date_string = out.start_date_string+" "+out.start_time_string+" - "+out.end_time_string;
    } else {
      out.full_date_string = out.start_date_string+" "+out.start_time_string+" - "+out.end_date_string+" "+out.end_time_string;
    }
  }

  return out;
}

export default reducerCombined;
