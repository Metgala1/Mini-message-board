const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required by Railway for secure connection
});

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  message TEXT,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (name, message)
VALUES 
  ('Alice', 'Hello, world!'),
  ('Bob', 'This is a test message.'),
  ('Charlie', 'How are you doing today?');
`;

async function main() {
  console.log('Populating database...');
  let client;
  try {
    client = await pool.connect();
    await client.query(SQL);
    console.log('Database populated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    if (client) client.release();
    await pool.end(); 
  }
}

main();

