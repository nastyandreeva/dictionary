const { createError } = require('../../../utils/errors');
const { isValidString, isValidBoolean, isDefined } = require('../../../../../utils/validators');

class CreateCategoryRequest {
  constructor(body) {
    this.slug = body.slug;
    this.name = body.name;
    this.description = body.description;
    this.active = body.active;

    if (!isValidString(this.slug)) {
      throw new createError('bad_params', `Invalid 'slug': ${this.slug}`);
    }

    if (!isValidString(this.name)) {
      throw new createError('bad_params', `Invalid 'name': ${this.name}`);
    }

    if (!isValidString(this.description)) {
      throw new createError('bad_params', `Invalid 'description': ${this.description}`);
    }

    if (!isValidBoolean(this.active)) {
      throw new createError('bad_params', `Invalid 'active': ${this.active}`);
    }
  }
}

module.exports = CreateCategoryRequest;
