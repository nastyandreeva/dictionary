const { processError, createError } = require('../../../utils/errors');
const { isValidString } = require('../../../../../utils/validators');
const db = require('../../../../../db/functions');

async function deleteCategory(ctx, next) {
  let result;

  try {
    const id = ctx.params.id;

    if (!isValidString(id)) {
      createError('BAD_PARAMS', `Param id is required and must be not empty string`, 400);
    }

    result = await db.deleteCategory(id);

    ctx.body = { code: 'OK', result, error: null };
  } catch (error) {
    const { status, body } = processError(error);

    ctx.status = status;
    ctx.body = body;
  }

  await next();
}

module.exports = deleteCategory;
