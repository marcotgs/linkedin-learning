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
    requestObj.headers = { 'Content-Type': 'application/json' };
  }
};

module.exports = async (userOptions, requestId) => {
  const requestObj = {
    method: userOptions.method,
    uri: userOptions.uri,
  };
  formatRequestData(requestObj, userOptions);
  const response = await fetch(requestObj.uri, { ...requestObj });
  return response.json();
};

