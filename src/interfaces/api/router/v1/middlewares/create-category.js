const { processError } = require('../../../utils/errors');
const CreateCategoryRequest = require('../dtos/create-category-request');
const db = require('../../../../../db/functions');

async function createCategory(ctx, next) {
  const request = new CreateCategoryRequest(ctx.request.body);

  let result;

  try {
    result = await db.createCategory(request);

    ctx.body = { code: 'OK', result, error: null };
  } catch (error) {
    const { status, body } = processError(error);

    ctx.status = status;
    ctx.body = body;
  }

  await next();
}

module.exports = createCategory;
