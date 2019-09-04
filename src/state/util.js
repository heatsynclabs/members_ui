import { get } from 'lodash';

export function getAuthOptions(getState) {
  const state = getState();
  const token = get(state, 'user.auth.token', null);
  return { headers: { Authorization: token } };
}
