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

import { startsWith, omitBy, isUndefined } from 'lodash';

import config from '../config';

export default function handledFetch(path, options){

  return fetch(path, options)
    .then((res) => {
      const contentType = res.headers.get("content-type");

      if (res.status >= 400) {
        const err = new Error("Bad response from server");
        err.status = res.status;
        
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

      if (startsWith(contentType, 'application/json')) {
        return res.json();
      } else if (startsWith(contentType, 'text')) {
        return res.text();
      }

      return res.blob();
    });
}

export function apiFetch(path, options = {}) {
  let qs = '';
  if(typeof options.body === 'object'){
    options.body = JSON.stringify(options.body);
    options.headers = options.headers || {};
    options.headers['Content-Type'] = 'application/json';
  }

  if (options.query) {
    const usp = new URLSearchParams(omitBy(options.query, isUndefined));
    qs = `?${usp.toString()}`;
  }

  Object.assign(options, { credentials: 'include' });

  return handledFetch(`${config.API_URL}${path}${qs}`, options);
}
