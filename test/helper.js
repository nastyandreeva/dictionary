const nock = require('nock');
const { pool } = require('./db/index');

beforeAll(async () => {
  nock.disableNetConnect();
  nock.enableNetConnect('127.0.0.1');
});

afterEach(async () => {
  await pool.query(`
  TRUNCATE categories.records CASCADE;
  `);
});

afterAll(async () => {
  nock.cleanAll();
  nock.enableNetConnect();
});
