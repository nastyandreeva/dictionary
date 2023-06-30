/**
 * Validate value of Date instance
 *
 * @param {Date} dateValue
 *
 * @returns {boolean} is valid
 */
function isValidDate(dateValue) {
  return dateValue && dateValue instanceof Date && !isNaN(dateValue.getTime());
}

/**
 * Validate string
 *
 * @param {string} stringValue
 *
 * @returns {boolean} is valid
 */
function isValidString(stringValue) {
  return (
    stringValue !== undefined &&
    stringValue !== null &&
    typeof stringValue === 'string' &&
    stringValue.trim() !== ''
  );
}

/**
 * Validate string: not null or empty
 *
 * @param {string} stringValue
 *
 * @returns {boolean} is valid
 */
function isStringNullOrEmpty(stringValue) {
  return (
    stringValue === null ||
    stringValue === undefined ||
    (typeof stringValue === 'string' && stringValue.trim() === '')
  );
}

/**
 * Validate boolean
 *
 * @param {boolean} boolValue
 *
 * @returns {boolean} is valid
 */
function isValidBoolean(boolValue) {
  return boolValue !== undefined && boolValue !== null && typeof boolValue === 'boolean';
}

/**
 * Validate Number
 *
 * @param {Number} numberValue
 *
 * @returns {boolean} is valid
 */
function isValidNumber(numberValue) {
  return (
    numberValue !== undefined &&
    numberValue !== null &&
    typeof numberValue === 'number' &&
    !isNaN(numberValue)
  );
}

function isValidEnum(enumObj, enumValue) {
  return Object.keys(enumObj).includes(enumValue) || Object.values(enumObj).includes(enumValue);
}

/**
 * Value not null or undefined
 *
 * @param {object} value
 *
 * @returns {boolean} is not null or undefined
 */
function isDefined(value) {
  return value !== null && value !== undefined;
}

module.exports = {
  isValidDate,
  isValidString,
  isStringNullOrEmpty,
  isValidBoolean,
  isValidNumber,
  isValidEnum,
  isDefined,
};
