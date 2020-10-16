import { makeDuck, resetReducer } from 'cooldux';
import { apiFetch } from '../lib/fetch';

const duck = makeDuck({
  browseAll: (query) => apiFetch('/user_certifications', { query }),
  browse: (user_id) => apiFetch(`/users/${user_id}/user_certifications`),
});

export const { browseAll, browse, initialStateCombined } = duck;

const reducer = resetReducer(initialStateCombined, (state = initialStateCombined, action) => {
  return duck.reducerCombined(state, action);
});

export default reducer;
