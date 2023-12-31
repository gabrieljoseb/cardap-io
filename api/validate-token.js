import pool from './database';

export default async function handler(req, res) {
    const { token } = req.query;

    try {
        // Verificar se o token existe
        const tokenResult = await pool.query('SELECT * FROM mesa_tokens WHERE token = $1', [token]);
        if (tokenResult.rowCount === 1) {
            // Token existe, permitir acesso
            res.status(200).json({ message: 'Acesso permitido', mesaId: tokenResult.rows[0].mesa_id });
        } else {
            // Token não existe ou inválido
            res.status(401).json({ message: 'Acesso negado' });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
