const { Pool } = require('pg');
const config = require('../configs/database');
const pool = new Pool(config);

module.exports = { pool };
