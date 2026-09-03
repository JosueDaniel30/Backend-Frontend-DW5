const { Pool } = require('pg');

// Pool administra las conexiones hacia PostgreSQL.
// Los datos de conexión se leen desde el archivo .env.
const pool = new Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
});

async function testPostgresConnection() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT NOW() AS fecha_servidor');
    console.log('PostgreSQL conectado:', result.rows[0].fecha_servidor);
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  testPostgresConnection,
};
