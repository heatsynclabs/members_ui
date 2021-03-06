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

// These env vars are set automatically as a result of
// npm run test, start, and build

// TODO: Remove this atrocity that exists
// solely because create-react-app doesnt let us set env vars
function getApiUrl() {
  // NOTE: the API URL should never have a trailing slash.
  if (process.env.REACT_APP_MEMBERS_API_URL) {
    return process.env.REACT_APP_MEMBERS_API_URL;
  } else if (window.location.hostname.includes('cooldomain')) {
    const [subdomain, hostname, tld] = window.location.href.split('.');
    let api = 'api';

    if (subdomain.includes('staging')) {
      api = 'api-staging';
    }

    return `https://${api}.${hostname}.${tld.split('/')[0]}`;
  }
  return 'http://localhost:3004';
}

const env = {
  test: {
    API_URL: 'http://localhost:3004'
  },
  development: {
    API_URL: getApiUrl()
  },
  staging: {
    API_URL: getApiUrl()
  },
  production: {
    API_URL: getApiUrl()
  },
};

export default env[process.env.NODE_ENV];
