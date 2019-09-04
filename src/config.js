// These env vars are set automatically as a result of
// npm run test, start, and build

// TODO: Remove this atrocity that exists
// solely because create-react-app doesnt let us set env vars
function getApiUrl() {
  if (window.location.hostname.includes('cooldomain')) {
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
