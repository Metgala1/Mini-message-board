const pool = require('./pool');

async function deleteTable(){
    const client = await pool.connect()
    try{
        client.query('DROP TABLE IF EXISTS messages')
        console.log('Table deleted successfully')
    } catch (error) {
        console.error('Error deleting table:', error)
    }finally {
        client.release()
        await pool.end()
    }
}

deleteTable()
