const pool = require('./db'); 

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()'); 
    console.log('Database time:', res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); 
  }
}

testConnection();
