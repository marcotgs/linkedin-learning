// const merge = require('lodash/merge');
const fetch = require('node-fetch');

const formatRequestData = (requestObj, userOptions) => {
  const { method, uri } = requestObj;
  const { body, qs } = userOptions;
  if ((/HEAD|GET/.test(method))) {
    const params = new URLSearchParams();
    if (qs) {
      for (key in qs) params.append(key, qs[key]);
      requestObj.uri = `${uri}?${params.toString()}`;
    }
  }
  else {
    requestObj.body = JSON.stringify(body);
    requestObj.headers['Content-Type'] = 'application/json';
  }
};

module.exports = async (userOptions, requestId) => {
  if (!requestId) {
    throw new TypeError('requestId is required');
  }
  const requestObj = {
    method: userOptions.method,
    uri: userOptions.uri,
    headers: {},
  };
  formatRequestData(requestObj, userOptions);
  requestObj.headers['X-Request-Id'] = requestId;
  const response = await fetch(requestObj.uri, { ...requestObj });
  return response.json();
};

