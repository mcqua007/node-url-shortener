function requestUrl(req) {
  const proxyHost = req.headers['x-forwarded-host'];
  const host = proxyHost ? host : req.headers.host;
  return req.protocol + '://' + host + req.originalUrl;
}
module.exports = requestUrl;
