const pool = require('./pool');

async function getMessages() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT name, message, date FROM messages ORDER BY id DESC'
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function addMessage(name, message) {
    const client = await pool.connect();
    try {
        const query = 'INSERT INTO messages (name, message) VALUES ($1, $2)';
        await client.query(query, [name, message]);
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    } finally {
        client.release();
    }
}

async function deleteMessage(id) {
    const client = await pool.connect();
    try {
        const query = 'DELETE FROM messages WHERE id = $1';
        await client.query(query, [id]);
    } catch (error) {
        console.error('Error deleting message:', error);
        throw error;
    } finally {
        client.release();
    }
    
}

module.exports = { getMessages, addMessage , deleteMessage};

