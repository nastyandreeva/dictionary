const { pool } = require('../index');

async function createRecordWithQuery(params) {
  const query = {
    text: 'SELECT * FROM categories.record_create($1::jsonb);',
    values: [params],
  };

  const result = await pool.query(query);

  if (result.rows.length === 0) {
    return;
  }

  return result.rows[0];
}

module.exports = {
  createRecordWithQuery,
}
