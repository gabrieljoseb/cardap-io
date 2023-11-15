import pool from './database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        switch (req.method) {
            case 'GET':
                // Recupere todos os clientes da tabela cliente
                const { rows } = await client.query('SELECT * FROM cliente ORDER BY id ASC');
                res.json(rows);
                break;

            case 'POST':
                // Insira um novo cliente na tabela cliente
                const { external_reference, user } = req.body;
                const insertQuery = 'INSERT INTO cliente (external_reference, nome, email, mesa_id) VALUES ($1, $2, $3, $4) RETURNING *';
                const insertResult = await client.query(insertQuery, [external_reference, user.nome, user.email, user.mesa_id]);
                res.status(201).json(insertResult.rows[0]);
                break;

            default:
                res.setHeader('Allow', ['GET', 'POST']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        console.error('API error:', err);
        if (err.code === '23505') { // Código de erro para violação de chave única
            res.status(409).send('Erro: External reference já existe.'); // Conflito
        } else {
            res.status(500).send('Erro interno do servidor');
        }
    } finally {
        client.release();
    }
};
