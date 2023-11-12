const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
})

async function generateAndStoreTokenForTable(tableId) {
    const token = uuidv4();
    const query = 'INSERT INTO mesa_tokens (token, mesa_id) VALUES ($1, $2)';
    await pool.query(query, [token, tableId]);
    console.log(`Token gerado para a mesa ${tableId}: ${token}`);
}

async function generateTokensForAllTables(numTables) {
    for (let i = 1; i <= numTables; i++) {
        await generateAndStoreTokenForTable(i);
    }
}

generateTokensForAllTables(10);
