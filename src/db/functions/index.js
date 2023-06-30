const { pool } = require('..');
const Category = require('../dtos/category');

async function getCategory(id, slug) {
  try {
    const query = {
      text: 'SELECT * FROM categories.record_get($1::text, $2::text);',
      values: [id, slug]
    };

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return;
    }

    return new Category(result.rows[0]);
  } catch (e) {
    throw new Error(
      `Could not get category record from DB by params(id=${id}, slug=${slug}): ${
        e.message
      }`
    );
  }
}

async function getAllCategories(params) {
  try {
    const query = {
      text: 'SELECT * FROM categories.records_get($1::jsonb);',
      values: [params]
    };

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return;
    }

    return result.rows.map(r => new Category(r));
  } catch (e) {
    throw new Error(
      `Could not get category all records from DB by params: ${JSON.stringify(
        params
      )}: ${e.message}`
    );
  }
}

async function createCategory(params) {
  try {
    const query = {
      text: 'SELECT * FROM categories.record_create($1::jsonb);',
      values: [params]
    };

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error(`Failed to create currency network`);
    }

    return new Category(result.rows[0]);
  } catch (e) {
    throw new Error(
      `Could not create category record in DB with params:${JSON.stringify(
        params
      )}: ${e.message}`
    );
  }
}

async function updateCategory(id, params) {
  try {
    const query = {
      text: 'SELECT * FROM categories.record_update($1::text, $2::jsonb);',
      values: [id, params]
    };

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error(`Failed to create update network`);
    }

    return new Category(result.rows[0]);
  } catch (e) {
    throw new Error(
      `Could not update category record(${id})in DB with params:${JSON.stringify(
        params
      )}: ${e.message}`
    );
  }
}

async function deleteCategory(id) {
  try {
    const query = {
      text: `SELECT * FROM categories.record_delete($1::text);`,
      values: [id]
    };
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      throw new Error(`Failed to delete category`);
    }

    return result.rows[0];
  } catch (e) {
    throw new Error(`Could not delete category record in DB with id:${id}: ${e.message}`);
  }
}

module.exports = {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
