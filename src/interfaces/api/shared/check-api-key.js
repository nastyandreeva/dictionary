const { apiKey } = require('../../../configs/api');

async function checkApiKey(ctx, next) {
  if (ctx.headers["x-api-key"] !== apiKey) {
    ctx.throw(401, "api key mismatch");
  }
  await next();
}

module.exports = checkApiKey;
