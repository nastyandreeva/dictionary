const getCategory = require('./get-category');
const createCategory = require('./create-category');
const updateCategory = require('./update-category');
const deleteCategory = require('./delete-category');
const getCategories = require('./get-categories');

module.exports = {
  deleteCategory,
  updateCategory,
  createCategory,
  getCategory,
  getCategories,
};
