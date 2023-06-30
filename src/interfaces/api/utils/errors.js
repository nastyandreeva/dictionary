const log = require('npmlog');

/**
 *
 * @param {string} code
 * @param {string} message
 * @param {number} httpStatus
 * @return {Error & {
 *   known: boolean,
 *   code: string,
 *   status: number,
 * }}
 */
function createError(code, message, httpStatus = 400) {
  const error = new Error(message);

  error.type = 'public';
  error.code = code;
  error.status = httpStatus;

  return error;
}

function getErrorResponse(error, tag) {
  if (error.type === 'public') {
    return {
      status: error.status,
      body: {
        code: 'BAD_PARAMS',
        result: null,
        error: `${error.code}, ${error.message}`,
      },
    };
  }

  if (error.type === 'unauthorized') {
    return {
      status: 401,
      body: {
        code: 'AUTH_ERROR',
        result: null,
        error: `unauthorized_error - ${error.message}`,
      },
    };
  }

  if (error.name === 'UnauthorizedError') {
    return {
      status: 401,
      body: {
        code: 'AUTH_ERROR',
        result: null,
        error: `unauthorized_error - ${error.message}`,
      },
    };
  }

  return {
    status: 500,
    body: {
      code: 'INTERNAL_SERVER_ERROR',
      result: null,
      error: 'unknown_error',
    },
  };
}

function processError(error, tag) {
  const response = getErrorResponse(error, tag);

  log.error(`Error ${response.body.code}: ${error.message}`);

  return response;
}

module.exports = {
  createError,
  processError,
};
