const { processError, createError } = require('../../../utils/errors');
const { isValidString, isDefined } = require('../../../../../utils/validators');
const db = require('../../../../../db/functions');

async function getCategory(ctx, next) {
  let record;

  try {
    const { id, slug } = ctx.request.query;

    if (isDefined(id) && !isValidString(id)) {
      throw createError('BAD_PARAMS', `Param id must be empty string`, 400);
    }

    if (isDefined(slug) && !isValidString(slug)) {
      throw createError('BAD_PARAMS', `Param slug must be empty string`, 400);
    }

    if (!isDefined(slug) && (!isDefined(id))) {
      throw createError('BAD_PARAMS', `Param slug or id must be`, 400);
    }

    record = await db.getCategory(id, slug);

    ctx.body = { code: 'OK', result: record ? record : {}, error: null };
  } catch (error) {
    const { status, body } = processError(error);

    ctx.status = status;
    ctx.body = body;
  }

  await next();
}

module.exports = getCategory;
