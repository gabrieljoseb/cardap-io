import pool from './database.js';

module.exports = async (req, res) => {
    const client = await pool.connect();

    try {
        switch (req.method) {
            case 'GET':
                const { rows } = await client.query('SELECT * FROM pedidos ORDER BY data_criacao DESC');
                res.json(rows);
                break;

            case 'DELETE':
                await client.query('DELETE FROM pedidos WHERE numero_transacao = $1', [req.body.numero_transacao]);
                res.status(204).send();
                break;

            default:
                res.setHeader('Allow', ['GET', 'DELETE']);
                res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (err) {
        console.log('API error: ' + err)
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
};
