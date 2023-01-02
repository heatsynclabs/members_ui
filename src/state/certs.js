import { makeDuck, resetReducer } from 'cooldux';
import { apiFetch } from '../lib/fetch';

const duck = makeDuck({
  browse: (query) => apiFetch('/certifications', { query }),
  read: (id) => apiFetch(`/certifications/${id}`),
  add: (body) => apiFetch('/certifications', { method: 'POST', body }),
  edit: (id, body) => apiFetch(`/certifications/${id}`, { method: 'PUT', body }),
});

export const {
  browse, add, edit, read, initialStateCombined,
} = duck;

// eslint-disable-next-line default-param-last
const reducer = resetReducer(initialStateCombined, (state = initialStateCombined, action) => {
  return duck.reducerCombined(state, action);
});

export default reducer;
