const { processError } = require('../../../utils/errors');
const db = require('../../../../../db/functions');

async function getCategories(ctx, next) {
  let result;

  try {
    result = await db.getAllCategories(ctx.request.query);

    ctx.body = { code: 'OK', result, error: null };
  } catch (error) {
    const { status, body } = processError(error);

    ctx.status = status;
    ctx.body = body;
  }

  await next();
}

module.exports = getCategories;
