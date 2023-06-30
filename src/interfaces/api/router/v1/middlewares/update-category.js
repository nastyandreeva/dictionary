const { processError, createError } = require('../../../utils/errors');
const { isValidString } = require('../../../../../utils/validators');
const UpdateCategoryRequest = require('../dtos/update-category-request');
const db = require('../../../../../db/functions');

async function updateCategory(ctx, next) {
  const request = new UpdateCategoryRequest(ctx.request.body);

  let result;

  try {
    const id = ctx.params.id;

    if (!isValidString(id)) {
      throw createError('BAD_PARAMS', `Param id is required and must be not empty string`, 400);
    }

    result = await db.updateCategory(id, request);

    ctx.body = { code: 'OK', result, error: null };
  } catch (error) {
    const { status, body } = processError(error);

    ctx.status = status;
    ctx.body = body;
  }

  await next();
}

module.exports = updateCategory;
