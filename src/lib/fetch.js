import { startsWith } from 'lodash';

import config from '../config';

export default function handledFetch(path, options){

  return fetch(path, options)
    .then((res) => {
      if (res.status >= 400) {
        const err = new Error("Bad response from server");
        err.status = res.status;
        const contentType = res.headers.get("content-type");

        if(startsWith(contentType, 'application/json')){
          return res.json()
          .then(content => {
            err.content = content;
            throw err;
          });
        }

        return res.text()
        .then(content => {
          err.content = content;
          throw err;
        });
      }
      return res;
    });

}

export function apiFetch(path, options = {}) {
  if(typeof options.body === 'object'){
    options.body = JSON.stringify(options.body);
  }
  Object.assign(options, { credentials: 'include' });

  return handledFetch(`${config.API_URL}${path}`, options)
    .then(res => {
      if(res.status === 200){
        return res.json();
      }
      return true;
    });
}
