const { processError } = require("../utils/errors");

/**
 * Process errors
 * @param {RouterContext} ctx - Router context
 * @param {Next} next - Next function
 * @return {Promise<void>}
 */
async function catcher(ctx, next) {
  try {
    await next();
  } catch (error) {
    const { status, body } = processError(error);

    ctx.status = status;
    ctx.body = body;
  }
}

module.exports = catcher;
