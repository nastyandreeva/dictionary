const Router = require('koa-router');
const { checkApiKey } = require('../../shared');
const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('./middlewares');

const router = new Router();

router.get('/category', checkApiKey, getCategory);
router.get('/categories', checkApiKey, getCategories);

router.post('/category', checkApiKey, createCategory);

router.put('/category/:id', checkApiKey, updateCategory);

router.delete('/category/:id', checkApiKey, deleteCategory);

module.exports = router;
