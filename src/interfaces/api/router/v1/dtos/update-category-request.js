const { createError } = require('../../../utils/errors');
const { isDefined, isValidBoolean, isValidString } = require('../../../../../utils/validators');

class UpdateCategoryRequest {
  constructor(body) {
    this.name = body.name;
    this.slug = body.slug;
    this.description = body.description;
    this.active = body.active;

    if (isDefined(this.name) && !isValidString(this.name)) {
      throw new createError('bad_params', `Invalid 'name': ${this.name}`);
    }

    if (isDefined(this.slug) && !isValidString(this.slug)) {
      throw new createError('bad_params', `Invalid 'slug': ${this.slug}`);
    }

    if (isDefined(this.description) && !isValidString(this.description)) {
      throw new createError('bad_params', `Invalid 'description': ${this.description}`);
    }

    if (isDefined(this.active) && !isValidBoolean(this.active)) {
      throw new createError('bad_params', `Invalid 'active': ${this.active}`);
    }
  }
}

module.exports = UpdateCategoryRequest;
